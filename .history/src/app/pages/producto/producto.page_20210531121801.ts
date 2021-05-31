import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/Producto';
import { ApiService } from 'src/app/Services/api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular'
import { LoadingService } from 'src/app/Services/loading.service';
import { cart } from 'src/app/model/cart';
import { AuthService } from 'src/app/Services/auth.service';
import { Cliente } from 'src/app/model/Cliente';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})


 //-----------------CLASE QUE CARGA EL PRODUCTO PARA COMPRARLO------------------------//
export class ProductoPage implements OnInit {
  slideOptsCube = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }
  slideOptsFlow = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }
 product: Producto| null = {
  id: undefined,
  name: undefined,
  id_producto: undefined,
  descripcion:undefined,
  categoria: undefined,
  precio: undefined,
  imagene1:undefined ,
  imagene2: undefined,
  imagene3:undefined ,
  Uds:undefined,
  Pedido:undefined ,
};
cargado=false;
productsinfoto:Producto;
nProductosCart=0;
isAuth:boolean=false;
usuario:any;
public Usuario:Cliente  | null= {
  id : undefined,
  name:undefined,
  surname: undefined,
  email: undefined,
  pedidos: undefined,
  
};
cart: cart| null = {
  id_cliente: undefined,
  productos:undefined
  
};
category:string;
ProductosCarrito:Producto[];
relacionados:Producto[];
relacionadosFotos:Producto[];
  constructor(private load:LoadingService, private route: ActivatedRoute,
    private apiS:ApiService,private navCtrl: NavController,
    private authS:AuthService,public loadingController: LoadingController,  private storage: NativeStorage) { }

  async ngOnInit() {
 
      this.carga();
     
 
 console.log(this.relacionadosFotos);
  }



    /**
* Metodo que carga el producto 

* @param  Product  Producto que se va a cargar
*/
  async carga(){  let id = this.route.snapshot.paramMap.get('id');
  this.load.presentLoading();
  this.product=await this.apiS.getProductoId(id);
  this.productsinfoto=await this.apiS.getProductoId(id);
 
  if(this.product){
   if(this.product.imagene1==null){
   }else{
     this.product.imagene1='data:image/jpeg;base64,'+this.product.imagene1;

   }
   if(this.product.imagene2==null){
  
   }else{
     this.product.imagene2='data:image/jpeg;base64,'+this.product.imagene2;
  
   }
   if(this.product.imagene3==null){
  
   }else{
     this.product.imagene3='data:image/jpeg;base64,'+this.product.imagene3;
   }
  }
   console.log(this.product);
   this.category=  this.product.categoria;
  this.relacionadosFotos= [] ;

    this.relacionados=await this.apiS.getProductall();
   
    this.relacionados.forEach((data)=>{
  
      if(data.categoria==this.category && data.id!=this.product.id){
        
        if(data.imagene1==null){
          data.imagene1="/assets/IMG/pordefecto.jpg";
        }else{
         data.imagene1='data:image/jpeg;base64,'+data.imagene1;
         console.log(data);
        }
        if(data.imagene2==null){
          data.imagene2="/assets/IMG/pordefecto.jpg";
        }else{
         data.imagene2='data:image/jpeg;base64,'+data.imagene2;
         console.log(data);
        }
        if(data.imagene3==null){
          data.imagene3="/assets/IMG/pordefecto.jpg";
        }else{
         data.imagene3='data:image/jpeg;base64,'+data.imagene3;
         console.log(data);
        }
        this.relacionadosFotos.push(data);
      }
    }) 
  
    this.cargado=true;
this.load.Dismiss();
  this.relacionadosFotos.reverse();
this.isAuth=this.authS.isAuthenticated();
    if(this.authS.isAuthenticated()){
      this.usuario = await this.storage.getItem("userApi");
      this.Usuario=await  this.apiS.getUserId(this.usuario.id);
      this.cart=await this.storage.getItem("cart");
        this.cart=await this.storage.getItem("cart");
        this.ProductosCarrito=this.cart.productos;
        this.nProductosCart=this.cart.productos.length;
      console.log(this.cart);
   if(this.cart.productos){
    this.ProductosCarrito=this.cart.productos;
   }else{
    this.ProductosCarrito=[];
   }
      console.log(this.Usuario);
    }else{  
        console.log("no hay usuario");
        this.nProductosCart=0;
      console.log("no hay usuario");
    }
this.cargado=true;
}

  /**
* Metodo que añade el producto al carrito de compra si esta autenticado el usuario
* @param  productsinfoto Producto
* @param  ProductosCArrito  Productos del carrito
*/
  async anadiralcarro(){
   // this.load.presentLoading();
  //  setTimeout(() => {
   //   this.load.loadingController.dismiss();
  //  }, 3000);
  try{
    if(this.authS.isAuthenticated()){
    if( this.productsinfoto){
      this.ProductosCarrito.push( this.productsinfoto);
      this.cart={
        id_cliente: this.Usuario.id,
        productos:this.ProductosCarrito
      }
     
  //guardar en el native storage
  this.load.presentToastSinColor("Añadido exitosamente");
  await this.storage.setItem("cart", this.cart);
     }
    }else{
      this.load.presentToastSinColor("Debes iniciar sesion para comprar") 
    }
  }catch(err){
this.load.presentToastSinColor("Debes iniciar sesion para comprar")
  }
  
}

 
doRefresh(event) {
  setTimeout(async () => {
 this.carga();

 console.log(this.relacionadosFotos);
    event.target.complete();
  }, 500);
}


  public atras() {
    this.navCtrl.back();
  }


  ToastCarrito(){
    this.load.presentToastSinColor("Para utilizar las funciones de compra inicie sesion en la pestaña 'Perfil'")
  }
}
