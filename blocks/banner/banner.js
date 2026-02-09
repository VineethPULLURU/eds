/**
 * decorates the banner block
 * @param {Element} block The banner block element
 */
export default function decorate(block) {
  // Add component class
  block.classList.add('cmp-banner');
  const mainDiv = block.querySelector('div > div');
  if (!mainDiv) return;

  const [textDiv, imgDiv] = Array.from(mainDiv.children);
  if (!textDiv || !imgDiv) return;

  const picture = imgDiv.querySelector('picture');
  const imgTitle = imgDiv.querySelector('#image-heading')?.textContent?.trim() || '';
  const btntext = imgDiv.querySelector('a')?.textContent?.trim() || '';
  const btnhref = imgDiv.querySelector('a').href || '';
  const imgSrc = picture?.querySelector('img')?.src || '';
  const textContent = textDiv.querySelector('p')?.textContent?.trim() || '';
  const textContentTitle = textDiv.querySelector('h2')?.textContent?.trim() || '';

  const banner = document.createElement('div');
  banner.className = 'banner';

  const container = document.createElement('div');
  container.className = 'container';

  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const heading = document.createElement('h2');
  heading.textContent = textContentTitle;

  const description = document.createElement('p');
  description.textContent = textContent;

  const bannerImg = document.createElement('div');
  bannerImg.className = 'banner-img';
  bannerImg.style.backgroundImage = imgSrc ? `url(${imgSrc})` : 'none';

  const imgHeading = document.createElement('h2');
  imgHeading.textContent = imgTitle;

  const cta = document.createElement('a');
  cta.className = 'banner-cta button';
  cta.href = btnhref;
  cta.textContent = btntext;

  bannerContent.append(heading, description);
  bannerImg.append(imgHeading, cta);
  container.append(bannerContent, bannerImg);
  banner.append(container);

  block.innerHTML = '';
  block.append(banner);
}
