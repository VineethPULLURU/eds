/**
 * decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  block.className = 'cmp hero-banner';

  const contentDivs = Array.from(block.querySelectorAll('div > div'));
  if (contentDivs.length < 2) return;

  const mainContentDiv = contentDivs[0];
  const bottomContentDiv = contentDivs[2];
  const firstP = mainContentDiv?.querySelector('p');
  if (!firstP) return;

  const pictureElement = firstP.querySelector('picture');
  const textAfterPicture = firstP.textContent
    .replace(pictureElement?.textContent || '', '')
    .trim();
  const heroTitle = textAfterPicture.split('\n')[0].trim() || '';
  const mainP = mainContentDiv.querySelector('p:nth-of-type(2)');
  const bottomTextHTML = bottomContentDiv.querySelector('p')?.outerHTML || '';

  const container = document.createElement('div');
  container.className = 'container';

  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const pictureWrapper = document.createElement('div');
  pictureWrapper.className = 'banner-image';
  if (pictureElement) pictureWrapper.appendChild(pictureElement.cloneNode(true));

  const textContent = document.createElement('div');
  textContent.className = 'banner-text';

  const h1 = document.createElement('h1');
  h1.textContent = heroTitle;

  const p = document.createElement('p');
  p.innerHTML = mainP ? mainP.innerHTML : '';

  textContent.append(h1, p);

  bannerContent.append(pictureWrapper, textContent);
  container.append(bannerContent);

  const bottomBar = document.createElement('div');
  bottomBar.className = 'bottom-bar';

  const bottomContainer = document.createElement('div');
  bottomContainer.className = 'container';
  bottomContainer.innerHTML = bottomTextHTML;
  bottomBar.append(bottomContainer);

  block.innerHTML = '';
  block.append(container, bottomBar);
}
