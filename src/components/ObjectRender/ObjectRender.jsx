import { Suspense } from "react";
import Head from "../Objects/Head/Head"
import Box from "../Objects/Box/Box"
import Sphere from "../Objects/Sphere/Sphere"

const ObjectRender = ({renderObj,color}) => {
  return (
    <Suspense fallback={null}>
        {renderObj === "Asaro Head" && (
          <Head locationString={"/lightref/asaro.glb"} color={color} />
        )}
        {renderObj === "Cube" && <Box position={[0, 0, 0]} color={color} />}
        {renderObj === "Sphere" && (
          <Sphere position={[0, 0, 0]} color={color} />
        )}
      </Suspense>
  )
}

export default ObjectRender