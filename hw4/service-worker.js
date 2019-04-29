var CACHE_VERSION = 'myapp-v2';

var CACHE_FILES = [


  'app.js',

  'Style.css',
  'Background/lightblue.jpg',
  'Background/lightgold.jpg',
  'Toys/cat.jpg',
  'Toys/crab.jpg',
  'Toys/dollhouse.jpg',
  'Toys/lego.jpg',
  'Toys/train.jpg',
  'Toys/face.jpeg'
];



self.addEventListener('install', event => {
    
  console.log('SW installed');
    
  event.waitUntil(
        
    caches
        
    .open(CACHE_VERSION)
        
    .then(cache => {
            
      console.log('SW caching files');
            
      cache.addAll(CACHE_FILES)
        
    })
        
    .then(() => self.skipWaiting())
    
  );

});



self.addEventListener('activate', event => {
    
  console.log('SW activated');
    
  event.waitUntil(
        
    caches.keys().then(keyNames => {
            
      return Promise.all(
                
        keyNames.map(key => {
                    
          if(key !== CACHE_VERSION) {
                        
            console.log('SW clearing old caches');
           
            return caches.delete(key);
                    
          }
                
        })
            
      );
        
    })
    
  );

});



self.addEventListener('fetch', event => {
    
  console.log('SW fetching');
    
  event.respondWith(
        
    fetch(event.request).catch(() => caches.match(event.request))
    
  );

});