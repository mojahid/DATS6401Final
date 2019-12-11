 var divElement = document.getElementById('viz1575996193415');                    
 var vizElement = divElement.getElementsByTagName('object')[0];                    
 if ( divElement.offsetWidth > 800 ) { vizElement.style.width='924px';vizElement.style.height='895px';} 
 else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='924px';vizElement.style.height='895px';} 
 else { vizElement.style.width='100%';vizElement.style.height='927px';}                     
 var scriptElement = document.createElement('script');                    
 scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
 vizElement.parentNode.insertBefore(scriptElement, vizElement);               