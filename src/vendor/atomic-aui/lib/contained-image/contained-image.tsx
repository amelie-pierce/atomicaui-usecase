// modules/design/atomic-aui/src/lib/contained-image/contained-image.tsx
import * as React from 'react';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';

export type ContainedImageFit = 'cover' | 'contain';
export type ContainedImageRatio = '1:1' | '4:3' | '16:9';

const CONTAINED_IMAGE_ASPECT_RATIO: Record<ContainedImageRatio, string> = {
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
};

export interface ContainedImageProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> {
  src: string;
  alt: string;
  fit?: ContainedImageFit;
  ratio?: ContainedImageRatio;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  imageProps?: Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'children' | 'className' | 'src' | 'style'
  >;
}

export const ContainedImage = React.forwardRef<HTMLSpanElement, ContainedImageProps>(
  function ContainedImage(
    {
      src,
      alt,
      fit = 'cover',
      ratio = '1:1',
      className,
      style,
      imageClassName,
      imageStyle,
      imageProps,
      ...rest
    },
    ref,
  ) {
    const aspectRatio = CONTAINED_IMAGE_ASPECT_RATIO[ratio];
    return (
      <span
        ref={ref}
        {...rest}
        className={mergeAuiClasses(['aui-contained-image', className])}
        data-aui-contained-image-ratio={ratio}
        data-aui-contained-image-fit={fit}
        style={{
          ...style,
          '--aui-contained-image-ratio': aspectRatio,
          aspectRatio,
        } as React.CSSProperties}
      >
        <img
          {...imageProps}
          className={mergeAuiClasses(['aui-contained-image__image', imageClassName])}
          src={src}
          alt={alt}
          style={{ ...imageStyle, objectFit: fit }}
        />
      </span>
    );
  },
);
ContainedImage.displayName = 'ContainedImage';

export default ContainedImage;
