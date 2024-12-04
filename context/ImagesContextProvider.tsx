import { StyleSheet, Text, View } from 'react-native'
import React, { Children, ReactNode, useState } from 'react'
import ImagesContext from './ImagesContext'

const ImagesContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [images,setImages]=useState([])
    function addImage(photoAdd){
        console.log('adding photo');
        
    }
  return (
    <ImagesContext.Provider value={images,addImage}>
        {children}
    </ImagesContext.Provider>
  )
}

export default ImagesContextProvider

const styles = StyleSheet.create({})