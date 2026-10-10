import remarkDirective from 'remark-directive';
export {remarkDirective};
/** Trusted repository Markdown; unsupported directives fail rather than disappear. */
export function articleDirectives() {
  return (tree, file) => {
    function visit(node) {
      // remark-directive sees the colon in legacy media markers as a text directive.
      // Restore only the exact standalone marker grammar before rendering HTML.
      if (node.type === 'paragraph' && node.children?.length === 3) {
        const [prefix, directive, suffix] = node.children;
        if (prefix.type === 'text' && prefix.value === '[[media' && directive.type === 'textDirective' && /^[a-z0-9-]+$/.test(directive.name) && suffix.type === 'text' && suffix.value === ']]') {
          node.children = [{type:'text', value:`[[media:${directive.name}]]`}];
        }
      }
      if (node.type === 'textDirective') {
        node.type = 'text';
        node.value = String(file.value).slice(node.position.start.offset, node.position.end.offset);
        delete node.children;
        delete node.name;
        delete node.attributes;
      }
      if (node.type === 'leafDirective') throw new Error('Use a supported ::: container directive for article blocks.');
      if (node.type === 'containerDirective') {
        if (!['note', 'warning', 'checkpoint', 'media-group'].includes(node.name)) throw new Error(`Unknown article directive: ${node.name}`);
        node.data = {hName: 'div', hProperties: {className: node.name === 'media-group' ? ['media-group'] : ['article-callout', `article-callout--${node.name}`], ...(node.name === 'media-group' ? {} : {role:'note', 'aria-label': node.name[0].toUpperCase() + node.name.slice(1)})}};
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
