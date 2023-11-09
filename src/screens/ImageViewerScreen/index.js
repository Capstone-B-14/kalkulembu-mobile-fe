import React, { memo, useRef, useMemo } from "react";
import { View, Image } from "react-native";
import { ImageWrapper, ImageViewer } from "react-native-reanimated-viewer";

const ImageViewerScreen = ({ route }) => {
  const imageRef = useRef(null);
  const { capturedImages = [] } = route.params || {};

  const imageData = useMemo(
    () =>
      capturedImages.map((img) => ({
        key: `key-${img.uri}`,
        source: { uri: img.uri },
      })),
    [capturedImages]
  );

  return (
    <>
      <ImageViewer ref={imageRef} data={imageData} />
      <View style={{ flexDirection: "row" }}>
        {imageData.map((img, index) => (
          <ImageWrapper
            key={img.source.uri}
            viewerRef={imageRef}
            index={index}
            source={{
              uri: img.source.uri,
            }}
          >
            <Image
              source={{
                uri: img.source.uri,
              }}
              style={{ width: 100, height: 100 }}
            />
          </ImageWrapper>
        ))}
      </View>
    </>
  );
};
export default memo(ImageViewerScreen);
