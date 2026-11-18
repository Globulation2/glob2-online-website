/** Establish an ordinary local practice game through its visible setup controls. */
export default async function practice({ control, screenshot }) {
  await screenshot('main-menu');
  await control('menu/3');
  await screenshot('custom-game-setup');
}
