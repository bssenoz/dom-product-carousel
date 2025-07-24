(() => {
    function init() {
        if (window.location.pathname !== "/") {
            console.log("wrong path");
            return;
        }
        
        loadFonts();
        buildHTML();
        buildCSS();
        fetchProducts();
    }

    function loadFonts() {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css?family=Poppins';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    function buildHTML() {
        const html = `
            <div class="product-carousel-container">
                <div class="product-carousel-header">
                    <h2>Beğenebileceğinizi düşündüklerimiz</h2>
                </div>
                <div class="product-carousel-wrapper" id="product-carousel"></div>
                <button class="product-carousel-arrow left" aria-label="Sola kaydır"><img src="https://cdn06.e-bebek.com/assets/svg/prev.svg" alt="Left Navigation" /></button>
                <button class="product-carousel-arrow right" aria-label="Sağa kaydır"><img src="https://cdn06.e-bebek.com/assets/svg/next.svg" alt="Right Navigation" /></button>
            </div>
        `;

        const storiesElement = document.querySelector('.ins-preview-wrapper');

        if (storiesElement) {
            storiesElement.insertAdjacentHTML('afterend', html);
        } else {
            console.log('Stories alanı bulunamadı!');
        }
    }

    function buildCSS() {
        const css = `
            .product-carousel-container {
                background-color: #fff;
                padding: 20px;
                margin-top: 20px;
                margin-bottom: 60px;
                width: 100%;
                margin-left: auto;
                margin-right: auto;
                font-family: 'Poppins', sans-serif;
                position: relative;
                @media (min-width: 576px) {
                    max-width: 540px;
                    padding: 20px;
                    margin-top: 20px;
                    margin-bottom: 60px;
                    margin-left: auto;
                    margin-right: auto;
                }
                @media (min-width: 768px) {
                    max-width: 720px;
                    padding: 20px;
                    margin-top: 20px;
                    margin-bottom: 60px;
                    margin-left: auto;
                    margin-right: auto;
                }
                @media (min-width: 992px) {
                    max-width: 960px;
                    padding: 30px 0px 20px 30px;
                    margin-top: 20px;
                    margin-bottom: 90px;
                    margin-left: auto;
                    margin-right: 20px;
                }
                 @media (min-width: 1280px) {
                    max-width: 1180px;
                    padding: 20px;
                    margin-left: 30px;
                    margin-right: 30px;
                }
                @media (min-width: 1480px) {
                    max-width: 1320px;
                    margin-left: 0px;
                    margin-right: 0px;
                }
      
            }

            .product-carousel-header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 22px 0 10px;
                font-family: Quicksand-Bold;
                font-weight: 700;
                background-color: #fff;

                @media (min-width: 480px) {
                    background-color: #fef6eb;
                    padding: 25px 67px;
                    border-top-left-radius: 35px;
                    border-top-right-radius: 35px;
                }
            }
            .product-carousel-header h2 {
                font-size: 2.2rem;
                line-height: 1.5;
                font-weight: 700;
                color: #f28e00;
                margin: 0;

                @media (min-width: 480px) {
                    font-size: 3rem;
                    line-height: 1.11;
                }
       
            }

            .product-carousel-wrapper {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                padding-bottom: 20px;
                margin-top: 20px;
                @media (min-width: 480px) {
                    box-shadow: 15px 15px 30px 0 #ebebeb80;
                    border-bottom-left-radius: 35px;
                    border-bottom-right-radius: 35px;
                }
            }

            .product-carousel-wrapper::-webkit-scrollbar {
                display: none;
            }

            .product-carousel-wrapper .item-card {
                position: relative;
                background-color: #fff;
                border: 1px solid #ededed;
                border-radius: 10px;
                box-sizing: border-box;
                flex-shrink: 0;
                display: flex;
                // padding-right: 2px;
                flex-direction: column;
                color: #7d7d7d;
                text-decoration: none;
                margin-right: 20px;
                width: calc((100% - 17px) / 2);
                height: 100%;

                @media (min-width: 326px) {
                    height: 557.98px;
                }

                @media (min-width: 992px) {
                    width: calc((100% - 37px) / 3);
                }
                @media (min-width: 1280px) {
                   width: calc((100% - 57px) / 4);
                }
                @media (min-width: 1480px) {
                    width: calc((100% - 77px) / 5);
                }
         
            }
            .product-carousel-wrapper .item-card:last-child {
                margin-right: 0;
            }
            .product-carousel-wrapper .item-card::after {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 8px;
                pointer-events: none;
                z-index: 2;
                border: 3px solid transparent;
                transition: border-color 0.2s;
            }
            .product-carousel-wrapper .item-card:hover::after {
                border: 3px solid #f28e00;
            }
 
            .product-carousel-wrapper .item-card .item-info {
                padding: 0 17px 17px 17px;
                flex: 0 0 auto;
                display: flex;
                flex-direction: column;
                height: auto;
                justify-content: flex-start;
            }
            .product-carousel-wrapper .item-card .item-info .item-details h2{
                font-size: 1.2rem;
                margin-bottom: 10px;

                @media (min-width: 480px) {
                    height: 42px;
                }
            }

            .product-carousel-wrapper .item-card .item-image-wrapper {
                position: relative;
                padding: 8px;
                margin-bottom: 65px;
                box-sizing: border-box;
            }

            .product-carousel-wrapper .item-card .item-image-wrapper .item-image {
                width: 100%;
                height: 203px;
                object-fit: contain;
            }


            .product-carousel-wrapper .item-card .item-image-wrapper .btn-favorite {
                position: absolute;
                top: 10px;
                right: 10px;
                border: none;
                cursor: pointer;
                z-index: 2;
                padding: 0;
                background-color: #fff;
                border-radius: 50%;
                box-shadow: 0 2px 4px 0 #00000024;
                width: 42px;
                height: 42px;

                @media (min-width: 992px) {
                    width: 50px;
                    height: 50px;
                }
            }
            .product-carousel-wrapper .item-card .item-image-wrapper .btn-favorite:hover {
                border: 1px solid #f28e00;
            }
            .product-carousel-wrapper .item-card .item-image-wrapper .icon-heart.favorited {
                fill: #ff9800;
            }

            .product-carousel-wrapper .item-card .item-info .item-details .item-price-old {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;

                @media (max-width: 480px) {
                    margin-top: 20px;
                    margin-bottom: 0px;
                }
            }
            .product-carousel-wrapper .item-card .item-info .item-details .original-price {
                font-size: 1.4rem;
                color: #999;
                text-decoration: line-through;
                font-weight: 500;
            }
            .product-carousel-wrapper .item-card .item-info .item-details .item-price {
                font-size: 1.8rem;
                font-weight: 600;
                color: #7d7d7d;
                margin-bottom: 0;
                margin-top: 0;
                width: 100%;
                transition: color 0.2s;

                @media (min-width: 480px) {
                    font-size: 2.2rem;
                }
            }
            .product-carousel-wrapper .item-card .item-info .item-details .item-price.discounted {
                color: #00b956;
            }
            .product-carousel-wrapper .item-card .item-info .item-details .item-price-old .discount-percent {
                color: #00b956;
                font-size: 18px;
                font-weight: 700;
                margin-top: 4px;
            }
            .product-carousel-wrapper .item-card .item-bottom{
                padding: 0 17px 17px;
                width: 100%;
                margin-top: auto;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                @media (max-width: 480px) {
                    padding: 0 8px 17px 8px;
                }
            }
            .product-carousel-wrapper .item-card .item-bottom .btn-add {
                width: 100%;
                background: #fff7ec;
                color: #f28e00;
                border: none;
                border-radius: 37.5px;
                padding: 15px;
                font-size: 1.4rem;
                line-height: 1.34;
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s;
                margin-top: 0;
                margin-bottom: 0;
                box-sizing: border-box;
                display: block;

                @media (min-width: 326px) {
                    padding: 15px 20px;
                }
            }
            .product-carousel-wrapper .item-card .item-bottom .btn-add:hover {
                background: #f28e00;
                color: #fff;
                transition: all 0.2s;
            }
            .product-carousel-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: none;
                background: #fff7ec;
                color: #f28e00;
                font-size: 2rem;
                font-weight: bold;
                box-shadow: 0 2px 8px 0 #0001;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s, color 0.2s;

                @media (max-width: 480px) {
                    display: none;
                }
            }
            .product-carousel-arrow:hover {
                background: #fff;
                border: 1px solid #f28e00;
            }
            .product-carousel-arrow.left {
                left: -40px;
                @media (min-width: 1280px) {
                    right: -45px;
                }
                @media (min-width: 1480px) {
                    left: -50px;
                }
            }
            .product-carousel-arrow.right {
                right: -40px;
                @media (min-width: 992px) {
                    right: -65px;
                }
                @media (min-width: 1280px) {
                    right: -45px;
                }
                @media (min-width: 1480px) {
                    right: -50px;
                }
            }

        `;

        const styleTag = document.createElement('style');
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
    }
 
    function isProductFavorite(productId) {
        const localFavorites = localStorage.getItem('favorites');
        const favorites = localFavorites ? JSON.parse(localFavorites) : [];
        return favorites.includes(productId);
    }

    function calculateDiscount(price, originalPrice) {
        const isDiscounted = price < originalPrice;
        let discountPercent = 0;

        if(isDiscounted){ 
            const diff = originalPrice - price;
            discountPercent = Math.round(100 * diff / originalPrice);
        }

        return { isDiscounted, discountPercent };
    };

    async function fetchProducts() {
        try {
            let products = [];
            const localProducts = localStorage.getItem('products');

            if (localProducts) {
                products = JSON.parse(localProducts);
            } else {
                const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
                products = await response.json();
                localStorage.setItem('products', JSON.stringify(products));
                console.log('get isteği çalıştı: ',products);
            }

            const carouselWrapper = document.getElementById('product-carousel');
            carouselWrapper.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('a');
                productCard.className = 'item-card';
                productCard.href = product.url;
                productCard.target = '_blank';
                productCard.dataset.productId = product.id;
                
                const isFavorite = isProductFavorite(product.id);
                const { isDiscounted, discountPercent } = calculateDiscount(product.price, product.original_price);

                productCard.innerHTML = `
                    <div class="item-image-wrapper">
                        <img src="${product.img}" alt="${product.name}" class="item-image" >
                        <button class="btn-favorite" aria-label="Favorilere ekle">
                            <svg class="icon-heart${isFavorite ? ' favorited' : ''}" width="28" height="28" viewBox="0 0 24 24" 
                                fill="${isFavorite ? '#ff9800' : 'none'}" stroke="#ff9800" stroke-width="2" 
                                stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="item-info">
                        <div class="item-details">
                            <h2><b>${product.brand} - </b><span>${product.name}</span></h2>
                            <div class="item-price-old">
                                ${isDiscounted ? `<span class="original-price">${product.original_price.toFixed(2)} TL</span><span class="discount-percent">%${discountPercent}</span>` : ''}
                            </div>
                            <div class="item-price${isDiscounted ? ' discounted' : ''}">${product.price.toFixed(2)} TL</div>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <button class="btn-add">Sepete Ekle</button>
                    </div>
                `;

                carouselWrapper.appendChild(productCard);
            });
            setFavoriteEvents();
            setArrowEvents();
        } catch (error) {
            console.error('Ürün verileri yüklenirken hata oluştu:', error);
            const carouselWrapper = document.getElementById('product-carousel');
            carouselWrapper.innerHTML = '<div style="padding: 20px; text-align: center;">Ürünler yüklenirken bir hata oluştu.</div>';
        }
    }

    function setFavoriteEvents() {
        const cards = document.querySelectorAll('.item-card');
    
        cards.forEach(card => {
            const favBtn = card.querySelector('.btn-favorite');
            const svg = favBtn.querySelector('svg');
            const productId = Number(card.dataset.productId);
    
            card.addEventListener('click', (e) => {
                const clickedButton = e.target.closest('.btn-favorite, .btn-add');
                if (clickedButton) e.preventDefault();
            });
    
            favBtn.addEventListener('click', (e) => {
                e.preventDefault();
    
                let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const index = favorites.indexOf(productId);
    
                const isFavorited = index !== -1;
    
                if (isFavorited) {
                    favorites.splice(index, 1);
                } else {
                    favorites.push(productId);
                }
    
                localStorage.setItem('favorites', JSON.stringify(favorites));
    
                svg.classList.toggle('favorited', !isFavorited);
                svg.setAttribute('fill', !isFavorited ? '#ff9800' : 'none');
            });
        });
    }
    

    function setArrowEvents() {
        const carousel = document.getElementById('product-carousel');
        const leftArrow = document.querySelector('.product-carousel-arrow.left');
        const rightArrow = document.querySelector('.product-carousel-arrow.right');
    
        if (!carousel || !leftArrow || !rightArrow) return;
    
        const getScrollStep = () => {
            const card = carousel.querySelector('.item-card');
            if (!card) return 0;
    
            const style = window.getComputedStyle(card);
            const margin = parseFloat(style.marginRight) || 0;
            
            return card.offsetWidth + margin;
        };
    
        const scrollToEdge = (direction) => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            const options = { left: direction === 'start' ? 0 : maxScroll, behavior: 'smooth' };
            carousel.scrollTo(options);
        };
    
        const handleScroll = (direction) => {
            const step = getScrollStep();
            if (!step) return;
    
            const current = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
            if (direction === 'left') {
                if (current <= step + 2) {
                    scrollToEdge('start');
                } else {
                    carousel.scrollBy({ left: -step, behavior: 'smooth' });
                }
            } else {
                const remaining = maxScroll - current;
                if (remaining <= step + 2) {
                    scrollToEdge('end');
                } else {
                    carousel.scrollBy({ left: step, behavior: 'smooth' });
                }
            }
        };
    
        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            handleScroll('left');
        });
    
        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            handleScroll('right');
        });
    };
    
    init();   

    let path = window.location.pathname;

    const observer = new MutationObserver(() => {
        if (window.location.pathname !== path) {
            path = window.location.pathname;
            const carousel = document.querySelector('.product-carousel-container');
            if (carousel && path !== '/' && path !== '') {
                carousel.remove();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();