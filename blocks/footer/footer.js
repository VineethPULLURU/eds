import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-grid container';

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  const sections = Array.from(footer.querySelectorAll('.section'));
  if (sections.length < 3) {
    block.append(footer);
    fragment.remove();
    return;
  }

  const socialSection = sections[0].querySelector('.default-content-wrapper');
  const linksSection = sections[1].querySelector('.default-content-wrapper');
  const newsletterSection = sections[2].querySelector('.default-content-wrapper');

  const socialTitle = socialSection?.querySelector('h3')?.textContent || 'Social-default';
  const socialLinks = Array.from(socialSection?.querySelectorAll('ul li') || []).map(li => li.outerHTML);

  const linksTitle = linksSection?.querySelector('h3')?.textContent || 'Quick links';
  const mainLinks = Array.from(linksSection?.querySelectorAll('ul li') || []).map(li => li.outerHTML);

  const newsletterTitle = newsletterSection?.querySelector('h3')?.textContent || 'Newsletter';
  const newsletterText = newsletterSection?.querySelector('p:nth-of-type(1)')?.textContent?.trim() || '';
  const buttonText = newsletterSection?.querySelector('p:nth-of-type(2)')?.textContent?.trim() || 'Sign Up!';
  const copyrightHTML = newsletterSection?.querySelector('p:last-of-type')?.outerHTML || '';

  const footerHTML = `
    <div class="footer-social">
      <h4>${socialTitle}</h4>
      <ul>${socialLinks.join('')}</ul>
    </div>
    <div class="footer-links">
      <h4>${linksTitle}</h4>
      <ul>${mainLinks.join('')}</ul>
    </div>
    <div class="footer-newsletter">
      <h4>${newsletterTitle}</h4>
      <form class="footer-newsletter-form">
        <label for="signup-field">${newsletterText}</label>
        <input id="signup-field" type="email" placeholder="Enter your email">
        <button class="newsletter-btn" type="submit">${buttonText}</button>
      </form>
      <span class="footer-copyright">${copyrightHTML}</span>
    </div>
  `;

  footer.innerHTML = footerHTML;
  block.append(footer);
  fragment.remove();
}
