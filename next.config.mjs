// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {
//             protocol: "https",
//             hostname: "res.cloudinary.com",
//           },
//         ],
//       },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "res.cloudinary.com",
          },
          {
              protocol: "https",
              hostname: "api.olamaps.io",
          },
      ],
  },
};

export default nextConfig;