// Ordinary anchors and native video are the fallback; the MIT viewer loads on inspection.
import 'photoswipe/style.css';
import type PhotoSwipe from 'photoswipe';
const article=document.querySelector<HTMLElement>('[data-article-content]');
if (article) {
  const links=[...document.querySelectorAll<HTMLAnchorElement>('[data-section-link]')];
  const headings=[...article.querySelectorAll<HTMLElement>('h2[id],h3[id]')];
  if (headings.length) {
    let queued=false;
    const update=()=>{
      queued=false;
      let active=headings[0];
      for (const heading of headings) {if(heading.getBoundingClientRect().top<=100) active=heading;else break;}
      links.forEach(link=>{if(link.hash===`#${active.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    };
    window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
    update();
  }
  const rail=document.querySelector<HTMLElement>('.article-rail--collection');
  const current=rail?.querySelector<HTMLElement>('a[aria-current="page"]');
  if(rail&&current) rail.scrollTop=Math.max(0,current.offsetTop-rail.clientHeight/3);
  const figures=[...article.querySelectorAll<HTMLElement>('.guide-media')];
  const videos=[...article.querySelectorAll<HTMLVideoElement>('video')];
  for(const video of videos) {
    video.addEventListener('play',()=>{videos.forEach(other=>{if(other!==video)other.pause();});});
    video.addEventListener('loadedmetadata',()=>{
      const duration=video.closest('figure')?.querySelector('[data-duration]');
      if(duration&&Number.isFinite(video.duration)) duration.textContent=` · ${Math.floor(video.duration/60)}:${String(Math.floor(video.duration%60)).padStart(2,'0')}`;
    });
  }
  type VideoState={time:number;rate:number;volume:number;muted:boolean;playing:boolean};
  const states=new Map<number,VideoState>();
  const read=(video:HTMLVideoElement):VideoState=>({time:video.currentTime,rate:video.playbackRate,volume:video.volume,muted:video.muted,playing:!video.paused&&!video.ended});
  const apply=(video:HTMLVideoElement,state:VideoState,resume:boolean)=>{
    const restore=()=>{
      video.currentTime=Number.isFinite(video.duration)?Math.min(state.time,video.duration):state.time;
      video.playbackRate=state.rate;video.volume=state.volume;video.muted=state.muted;
      if(resume&&state.playing&&video.isConnected) void video.play().catch(()=>{});else video.pause();
    };
    if(video.readyState>=1)restore();else {video.addEventListener('loadedmetadata',restore,{once:true});video.load();}
  };
  let gallery:PhotoSwipe|undefined;
  let loading:Promise<typeof import('photoswipe')>|undefined;
  let opening=false;
  const expanded=new Map<number,HTMLVideoElement>();
  const activeExpanded=new Set<number>();
  const saveExpanded=(index:number)=>{
    const video=expanded.get(index);
    if(video&&activeExpanded.has(index)&&video.readyState>=1){states.set(index,read(video));video.pause();}
    activeExpanded.delete(index);
  };
  const open=async(index:number,origin:HTMLAnchorElement)=>{
    loading??=import('photoswipe');
    const {default:Viewer}=await loading;
    const scrollPosition=window.scrollY;
    states.clear();expanded.clear();activeExpanded.clear();
    const touched=new Set<number>();
    const originallyPlaying=new Set<number>();
    videos.forEach(video=>{const videoIndex=figures.indexOf(video.closest<HTMLElement>('figure')!);const state=read(video);states.set(videoIndex,state);if(state.playing)originallyPlaying.add(videoIndex);video.pause();});
    const items=figures.map(figure=>{
      const image=figure.querySelector<HTMLImageElement>('img');
      const video=figure.querySelector<HTMLVideoElement>('video');
      const caption=figure.querySelector('figcaption')?.textContent??'';
      return video
        ? {type:'video',width:video.width,height:video.height,video,caption}
        : {src:image!.src,width:Number(image!.getAttribute('width')),height:Number(image!.getAttribute('height')),alt:image!.alt,caption};
    });
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const viewer=new Viewer({
      dataSource:items,index,mainClass:'article-viewer',loop:false,preload:[0,0],
      trapFocus:true,returnFocus:false,escKey:true,arrowKeys:true,
      showHideAnimationType:'fade',showAnimationDuration:reduced?0:160,
      hideAnimationDuration:reduced?0:160,zoomAnimationDuration:reduced?0:160,
      initialZoomLevel:'fit',secondaryZoomLevel:levels=>Math.max(1,levels.initial*2),maxZoomLevel:4,
      imageClickAction:'zoom',tapAction:'toggle-controls',bgOpacity:1,
      paddingFn:viewport=>({top:60,bottom:Math.min(180,Math.round(viewport.y*.22))+(viewport.x<=600?56:0),left:16,right:16}),
    });
    gallery=viewer;
    const inertBefore=new Map<HTMLElement,boolean>();
    let closing=false;
    let closeIndex=index;
    const updateControls=()=>{
      const slide=viewer.currSlide;
      const button=viewer.element?.querySelector<HTMLButtonElement>('.pswp__button--actual-size');
      if(button){button.disabled=slide?.data.type==='video';button.setAttribute('aria-pressed',String(Boolean(slide&&Math.abs(slide.currZoomLevel-1)<.01)));}
    };
    viewer.on('uiRegister',()=>{
      viewer.ui?.registerElement({name:'caption',order:9,appendTo:'root',onInit:element=>{
        element.classList.add('pswp__article-caption');element.id='article-media-caption';
        element.setAttribute('role','status');element.setAttribute('aria-live','polite');element.tabIndex=0;
        const update=()=>{element.textContent=String(viewer.currSlide?.data.caption??'');};
        viewer.on('change',update);update();
      }});
      viewer.ui?.registerElement({name:'actual-size',order:8,isButton:true,ariaLabel:'View actual size',html:'1:1',onInit:element=>{element.setAttribute('aria-pressed','false');},onClick:()=>{
        const slide=viewer.currSlide;
        if(slide&&slide.data.type!=='video')viewer.zoomTo(Math.abs(slide.currZoomLevel-1)<.01?slide.zoomLevels.fit:1,undefined,reduced?0:160);
      }});
      if(document.fullscreenEnabled)viewer.ui?.registerElement({name:'fullscreen',order:9,isButton:true,ariaLabel:'Toggle fullscreen',html:'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 32 32"><path d="M5 12V5h7M20 5h7v7M27 20v7h-7M12 27H5v-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',onClick:()=>{
        if(document.fullscreenElement===viewer.element)void document.exitFullscreen().catch(()=>{});
        else void viewer.element?.requestFullscreen().catch(()=>{});
      }});
    });
    viewer.addFilter('contentErrorElement',(element,content)=>{
      element.textContent='This image could not load. ';
      const link=document.createElement('a');link.href=String(content.data.src??'');link.textContent='Open original image';element.append(link);
      return element;
    });
    viewer.on('contentLoad',event=>{
      const {content}=event;
      if(content.data.type!=='video')return;
      event.preventDefault();
      const source=content.data.video as HTMLVideoElement;
      const shell=document.createElement('div');shell.className='pswp__video-shell';
      const video=document.createElement('video');
      video.controls=true;video.playsInline=true;video.preload='none';video.poster=source.poster;video.tabIndex=0;
      video.setAttribute('aria-label',source.getAttribute('aria-label')??'Gameplay clip');
      video.setAttribute('aria-describedby','article-media-caption');video.dataset.mediaIndex=String(content.index);
      for(const child of source.querySelectorAll('source,track'))video.append(child.cloneNode(true));
      const fallback=document.createElement('a');fallback.href=source.querySelector('source')!.src;fallback.textContent='Open gameplay clip';video.append(fallback);
      const failure=document.createElement('p');failure.className='pswp__video-error';failure.hidden=true;
      failure.append('This clip could not load. ',fallback.cloneNode(true));shell.append(video,failure);
      const revealFailure=()=>{failure.hidden=false;};
      video.addEventListener('error',revealFailure);
      video.querySelectorAll('source').forEach(source=>source.addEventListener('error',revealFailure));
      video.addEventListener('play',()=>{videos.forEach(other=>other.pause());expanded.forEach(other=>{if(other!==video)other.pause();});});
      content.element=shell;expanded.set(content.index,video);content.onLoaded();
    });
    // Native controls own their pointer events; arrows remain available for clips.
    viewer.on('pointerDown',event=>{if((event.originalEvent.target as Element).closest('video'))event.preventDefault();});
    viewer.on('keydown',event=>{
      const keyboard=event.originalEvent;
      if((keyboard.target as Element).closest('video')&&!['Escape','Tab'].includes(keyboard.key))event.preventDefault();
      // PhotoSwipe's focusin trap handles outside elements; at the browser's
      // chrome boundary no focusin fires. Wrap only the dialog's Tab endpoints.
      if(keyboard.key==='Tab'&&viewer.element) {
        const focusable=[...viewer.element.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],video[controls],[tabindex="0"]')].filter(element=>{
          const style=getComputedStyle(element);
          return element.getClientRects().length>0&&style.visibility!=='hidden'&&style.display!=='none'&&!element.closest('[aria-hidden="true"]');
        });
        const first=focusable[0];const last=focusable.at(-1);const active=document.activeElement;
        if(first&&last&&(keyboard.shiftKey&&(active===first||active===viewer.element)||!keyboard.shiftKey&&(active===last||active===viewer.element))) {
          event.preventDefault();keyboard.preventDefault();(keyboard.shiftKey?last:first).focus();
        }
      }
    });
    viewer.on('contentActivate',({content})=>{
      const video=expanded.get(content.index);const state=states.get(content.index);
      if(video){touched.add(content.index);activeExpanded.add(content.index);if(state)apply(video,state,!closing);}
    });
    viewer.on('contentDeactivate',({content})=>{saveExpanded(content.index);});
    viewer.on('contentRemove',({content})=>{saveExpanded(content.index);});
    viewer.on('contentDestroy',({content})=>{saveExpanded(content.index);expanded.delete(content.index);});
    viewer.on('change',()=>{updateControls();});
    viewer.on('zoomPanUpdate',updateControls);
    viewer.on('afterInit',()=>{
      viewer.element?.setAttribute('aria-label','Article media viewer');
      viewer.element?.setAttribute('data-pagefind-ignore','');
      viewer.element?.querySelectorAll<HTMLButtonElement>('button').forEach(button=>{button.tabIndex=0;});
      // Preserve pre-existing inert state and let PhotoSwipe own focus handling.
      for(const child of document.body.children){if(child instanceof HTMLElement&&child!==viewer.element){inertBefore.set(child,child.inert);child.inert=true;}}
      article.dispatchEvent(new CustomEvent('article:media-open',{detail:{index}}));
    });
    viewer.on('close',()=>{
      closeIndex=viewer.currIndex;saveExpanded(closeIndex);closing=true;
      expanded.forEach(video=>video.pause());
      if(document.fullscreenElement===viewer.element)void document.exitFullscreen().catch(()=>{});
    });
    viewer.on('destroy',()=>{
      inertBefore.forEach((inert,element)=>{element.inert=inert;});
      const resumeIndex=figures[closeIndex].querySelector('video')?closeIndex:[...originallyPlaying][0];
      for(const videoIndex of new Set([...touched,...originallyPlaying])){const state=states.get(videoIndex);const video=figures[videoIndex].querySelector('video');if(video&&state)apply(video,state,videoIndex===resumeIndex);}
      origin.focus({preventScroll:true});window.scrollTo(0,scrollPosition);
      gallery=undefined;expanded.clear();
      article.dispatchEvent(new CustomEvent('article:media-close',{detail:{index:closeIndex}}));
    });
    viewer.init();
  };
  article.addEventListener('click',async event=>{
    const target=(event.target as Element).closest<HTMLAnchorElement>('[data-media-open]');
    if(!target||event.defaultPrevented||event instanceof MouseEvent&&(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))return;
    event.preventDefault();
    const figure=target.closest<HTMLElement>('.guide-media');const index=figure?figures.indexOf(figure):-1;
    if(index<0||opening)return;
    if(gallery){gallery.goTo(index);return;}
    opening=true;
    try{await open(index,target);}
    catch{loading=undefined;const failedViewer=gallery as PhotoSwipe|undefined;failedViewer?.destroy();gallery=undefined;window.location.assign(target.href);}
    finally{opening=false;}
  });
}
