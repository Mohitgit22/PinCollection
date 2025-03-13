import { IKImage } from "imagekitio-react";

const Image = ({ path, src, alt, className, w, h }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      path={path}
      src={src}
      transformation={[
        {
          height: h,
          width: w,
        },
      ]}
      alt={alt}
      loading="lazy"
      className={className}
      lqip={{ active: true, quality: 20 }}
    />
  );
};

export default Image;

// import { IKImage } from "imagekitio-react";

// const Image = ({ path, src, alt, className, w, h }) => {
//   // Determine if the image is from ImageKit or an external source
//   const isExternal = src?.startsWith("http");

//   return isExternal ? (
//     // Render normal <img> tag for external images
//     <img
//       src={src}
//       alt={alt}
//       width={w}
//       height={h}
//       className={className}
//       loading="lazy"
//     />
//   ) : (
//     // Render IKImage for ImageKit-hosted images
//     <IKImage
//       urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
//       path={path} // Only use path if it's an ImageKit image
//       transformation={[
//         {
//           height: h,
//           width: w,
//         },
//       ]}
//       alt={alt}
//       loading="lazy"
//       className={className}
//       lqip={{ active: true, quality: 20 }}
//     />
//   );
// };

// export default Image;
