interface ImageLoaderProps {
  src: string;
}

const imageLoader = ({ src }: { src: string }): string => {
  return src;
};

export default imageLoader;
