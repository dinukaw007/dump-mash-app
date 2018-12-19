import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { CollectionPoint } from '../../shared/model/collection-point.model';
import { CollectionPointservice } from '../../shared/service/collection-points.service';
import { DataStorageService } from '../../shared/service/data.storage.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the RecyclersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recyclers',
  templateUrl: 'recyclers.html',
})
export class RecyclersPage implements OnInit {
  collectionPointSubscription: Subscription;
  collectionPoints: CollectionPoint[];
  isCollectionPointsAvailable: boolean = false;


  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private collectionPointservice: CollectionPointservice,
    private dataStorageService: DataStorageService,
    private launchNavigator: LaunchNavigator,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    public platform: Platform) {
  }

  ngOnInit() {

    this.collectionPointSubscription = this.collectionPointservice.collectionPointChanged.subscribe(
      (collectionPoints: CollectionPoint[]) => {
        this.collectionPoints = collectionPoints;
        this.isCollectionPointsAvailable = true;
        this.loading.dismiss();
      }
    );
    this.dataStorageService.getCollectionPoints();
  }

  ionViewDidLoad() {
    this.loading.present();
  }

  ionViewDidLeave() {
    this.collectionPointSubscription.unsubscribe();
  }


  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });

    toast.present();
  }

  onNavigateMap(collectionPoint: CollectionPoint) {
    const loading2 = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.platform.ready().then(() => {      
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        let isgoogleMapAvailable = this.launchNavigator.isAppAvailable('google_maps')
        if (isgoogleMapAvailable) {
          this.launchNavigator.navigate([collectionPoint.latitude, collectionPoint.longitude], {
            start: resp.coords.latitude + "," + resp.coords.longitude
          }).then(
            success => {
              loading2.dismiss();
              //console.log('Launched navigator')
            },
            error => {
              loading2.dismiss();
              //console.log('Error launching navigator', error);
              this.presentToast("Somthing went wrong : " + error);
            }
          ).catch(() => {
            loading2.dismiss();
            this.presentToast("Somthing went wrong");
            //this.loading.dismiss();
          });
        } else {
          loading2.dismiss();
          this.presentToast("Google map unavailable");
        }
      }).catch((error) => {
        loading2.dismiss();
        console.log('Error getting location', error);
        this.presentToast('Error getting location ' + error);
      });
    });
    // this.navCtrl.push(MapPage,{
    //   latitude:collectionPoint.latitude,
    //   longitude:collectionPoint.longitude,
    //   navigateMap: true
    //   });
  }

}
