/**
 * decorates the blog-cards block
 */
export default function decorate(block) {
  const mainRows = Array.from(block.querySelectorAll('div > div'));
  if (mainRows.length < 2) return;
  
  const validBlogRows = [];
  const sidebarImgs = [];
  
  mainRows.forEach((row, index) => {
    const [textDiv, imgDiv] = Array.from(row.children);
    
    if (textDiv && imgDiv && textDiv.children.length >= 3) {
      validBlogRows.push({ textDiv, imgDiv });
      sidebarImgs.push(imgDiv);
    }
  });
  
  if (validBlogRows.length === 0) return;

  const blogTitle = document.createElement('h2');
  blogTitle.className = 'blogs-title';
  blogTitle.textContent = 'Featured Blogs';
  const container = document.createElement('div');
  container.className = 'blogs-container container';
  
  const blogsMain = document.createElement('div');
  blogsMain.className = 'blogs-main';
  
  blogsMain.innerHTML = `
    ${validBlogRows.map(({ textDiv }) => {
      const allPs = Array.from(textDiv.querySelectorAll('p'));
      const linkDiv = textDiv.querySelector('.button-container');
      
      const date = allPs[0]?.textContent?.trim() || '';
      const title = allPs[1]?.querySelector('strong')?.textContent?.trim() || 
                   allPs[1]?.textContent?.trim() || '';
      const desc = allPs[2]?.textContent?.trim() || '';
      
      // Safe read-more link
      let readMoreHTML = '<a href="#" class="read-more">Read more</a>';
      if (linkDiv) {
        const link = linkDiv.querySelector('a');
        if (link) {
          link.classList.add('read-more');
          readMoreHTML = linkDiv.innerHTML;
        }
      }
      
      return `
        <div class="blog-item">
          <div class="blog-item-heading">
            <h3>${title || 'Untitled'}</h3>
            <span>${date || 'No date'}</span>
          </div>
          <p class="blog-item-desc">${desc || 'No description'}</p>
          ${readMoreHTML}
        </div>
      `;
    }).join('')}
  `;
  
  const blogsSidebar = document.createElement('div');
  blogsSidebar.className = 'blogs-sidebar';
  
  const sidebarImages = document.createElement('div');
  sidebarImages.className = 'sidebar-images';
  sidebarImgs.forEach(imgDiv => {
    const picture = imgDiv.querySelector('picture');
    if (picture) {
      sidebarImages.appendChild(picture.cloneNode(true));
    }
  });
  
  blogsSidebar.appendChild(sidebarImages);
  
  container.append(blogsMain, blogsSidebar);
  
  block.innerHTML = '';
  block.append(blogTitle);
  block.append(container);
}
