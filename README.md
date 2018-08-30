# ProcessMaker React-Native App    
     
**Getting started:**     
> Clone the repository: develop branch.     
> Run: ``npm install``    

**Deploying**
> Android Run: ``react-native run-android``    
> IOS Run: ``react-native run-ios``          
      
 **Get an apk debug to distribuite:**
    > Go to your folder where the code is.      
    > Execute: _``react-native start``_     
    > Use Bundle option of react-native commands like: _``react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug ``_    
    > Go to android folder: cd android     
    > Execute gradle Build: _``./gradlew assembleDebug For Windows: gradlew assembleRelease``_     
    > Go to: android/app/build/outputs/apk      
    > Use the APK       