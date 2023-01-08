import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
THREE.Cache.enabled = true;

const loadGltf = async (url) => {
  const gltfLoader = new GLTFLoader()
  const gltf = await new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        resolve(gltf)
      },
      (progress) => {
        console.log()
      },
      (error) => {
        reject(error)
      }
    )
  })
  return gltf
}

const loadAnimationClip = async (url) => {
  const loader = new FBXLoader()
  const asset = await loader.loadAsync(url)
  const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com')

  return new THREE.AnimationClip('mixamoAnimation', clip.duration, clip.tracks)
}

export { loadGltf, loadAnimationClip }
