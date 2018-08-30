package com.processmaker;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.goodatlas.audiorecord.RNAudioRecordPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.fileopener.FileOpenerPackage;
import com.filepicker.FilePickerPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import io.rumors.reactnativesettings.RNSettingsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.example.qiepeipei.react_native_clear_cache.ClearCachePackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import io.realm.react.RealmReactPackage;
import com.rnziparchive.RNZipArchivePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAudioRecordPackage(),
            new RNSoundPackage(),
            new FileOpenerPackage(),
            new FilePickerPackage(),
            new RSSignatureCapturePackage(),
            new RNSettingsPackage(),
            new MapsPackage(),
            new ClearCachePackage(),
            new RNUUIDGeneratorPackage(),
            new RealmReactPackage(),
            new RNZipArchivePackage(),
            new ReactNativeRestartPackage(),
            new ReactNativePushNotificationPackage(),
            new ImagePickerPackage(),
            new OrientationPackage(),
            new RNGoogleSigninPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RNI18nPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
