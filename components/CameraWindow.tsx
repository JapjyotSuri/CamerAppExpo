import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  
  CameraType,
  useCameraPermissions,
  Camera,
  CameraView,
} from "expo-camera";
type PermissionResponse = {
  granted: boolean; // Whether the permission was granted
  canAskAgain: boolean; // Whether the user can be prompted again for this permission
  expires: "never" | number; // When the permission expires
  status: "undetermined" | "granted" | "denied"; // Current permission status
};
const CameraWindow = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permissions, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);
  // useEffect(() => {
  //     async function requestPermission(){
  //         if(!permissions || !permissions.granted){
  //             const permisiionResponse=await requestPermission();
  //             setHasPermission(permisiionResponse?.granted || false)
  //         }
  //         else{

  //         }
  //     }
  //     requestPermission();
  // },[permissions])
  useEffect(() => {
    async function ensurePermission() {
      if (!permissions || !permissions.granted) {
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
  }, [permissions,hasPermission]);

  if (!permissions) {
    return <View></View>;
  }
  if (!permissions.granted) {
    return (
      <View>
        <Text>Please give camera permission to run this app</Text>
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <View style={{ flex: 1 }}>
      <CameraView facing={facing} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Pressable onPress={toggleCameraFacing}>
            
            <Text>Flip Camera</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraWindow;

const styles = StyleSheet.create({});
