import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraCapturedPicture } from 'expo-camera'

type ShowPreviewProps={
    photo: CameraCapturedPicture,
    handleRetakePhoto: () => void;
}

const ShowPreview = ({photo,handleRetakePhoto}: ShowPreviewProps) => {
  return (
    <View style={styles.container }>
      <View style={styles.box}>
        <Image style={styles.previewConatiner} source={{uri: 'data:image/jpg;base64,' + photo.base64}} />
      </View>
      <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleRetakePhoto}>
               <Text>Retake</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default ShowPreview

const styles = StyleSheet.create({container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
},
box: {
    borderRadius: 15,
    padding: 1,
    width: '95%',
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    alignItems: "center",
},
previewConatiner: {
    width: '95%',
    height: '85%',
    borderRadius: 15
},
buttonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: "center",
    width: '100%',
},
button: {
    backgroundColor: 'gray',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
}})