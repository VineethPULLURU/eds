export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`, 'cmp-columns');

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  const container = document.createElement('div');
  container.className = 'container';
  
  cols.forEach((col, colIndex) => {
    const column = document.createElement('div');
    column.className = 'column';
    
    const textDivs = col.querySelectorAll('div:not(.columns-img-col)');
    const imgDiv = col.querySelector('.columns-img-col');
    
    if (colIndex === 0) {
      const textContent = textDivs[0];
      const col1Text = document.createElement('div');
      col1Text.className = 'column-text';
      if (textContent) col1Text.append(...textContent.childNodes);
      
      const col1Img = document.createElement('div');
      col1Img.className = 'column-image';
      if (imgDiv) col1Img.appendChild(imgDiv.cloneNode(true));
      
      column.append(col1Text, col1Img);
    } else {
      const col2Img = document.createElement('div');
      col2Img.className = 'column-image';
      if (imgDiv) col2Img.appendChild(imgDiv.cloneNode(true));
      
      const textContent = textDivs[0];
      const col2Text = document.createElement('div');
      col2Text.className = 'column-text';
      if (textContent) col2Text.append(...textContent.childNodes);
      
      column.append(col2Img, col2Text);
    }
    
    container.append(column);
  });
  
  block.innerHTML = '';
  block.append(container);
}
