import ShowPreview from '@/components/ShowPreview';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const [photo,setPhoto]=useState<any>(null)
  useEffect(() => {
    async function ensurePermission() {
      if (!permission || !permission.granted) {
        const permissionResponse = await requestPermission(); // Updates permissions
        if (permissionResponse && permissionResponse.granted) {
          setHasPermission(permissionResponse.granted);
          console.log("Camera permission granted");
        } 
        else {
            
            console.log("Camera permission denied");
          }
      }
    }
    ensurePermission();
  }, [permission,hasPermission]);

  async function handleTakePhoto(){
      if(cameraRef.current){
        const options={
          quality: 1,
          base64: true,
          exif: false,
        }
        const takePhoto=await cameraRef.current?.takePictureAsync(options)
        console.log(takePhoto?.base64);
        setPhoto(takePhoto)

      }
      
  }
  if (!permission) {
    // Camera permissions are still loading.
    return <View></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}> We need your permission to show the camera </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function handleRetakePhoto(){
   setPhoto(null)
  }
  if(photo){
    return <ShowPreview photo={photo} handleRetakePhoto={handleRetakePhoto}/>
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
    
      <CameraView  ref={cameraRef} style={styles.camera} facing={facing}>
        
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.text}>Capture Photo</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
