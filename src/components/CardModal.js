import {
  Box,
  Center,
  Image,
  Link,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import uuid from "react-native-uuid";
import { MainBlack, MainWhite } from "../constants/Styles";
import { fetchDetails } from "../routes/TomTomAPI";
import { urlParser } from "../utils/GeneralUtils";

function CardModal(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      {
        let fetchedPhotos = await fetchDetails(0, props.plan.id, true);
        setPhotos(fetchedPhotos);
      }
    };
    if (props.showModal) {
      fetchData();
    }
  }, [props.showModal]);

  return (
    <Modal
      isOpen={props.showModal}
      onClose={() => {
        props.setShowModal(false);
        setPhotos([]);
      }}
    >
      <Modal.Content w="full">
        <Modal.CloseButton />
        <Modal.Header>{props.plan.name}</Modal.Header>
        <Modal.Body>
          {photos != undefined ? (
            photos.length > 1 ? (
              <ScrollView
                horizontal={true}
                borderRadius={13}
                mt={2}
                showsHorizontalScrollIndicator={false}
              >
                {photos.map((picture) => {
                  return (
                    <Image
                      key={uuid.v4()}
                      h="400"
                      w={80}
                      mr={2}
                      source={{ uri: picture }}
                      alt={props.plan.name}
                      borderRadius={13}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <Center>
                {photos != undefined ? (
                  <Image
                    h="400"
                    w={80}
                    source={{ uri: photos[0] }}
                    alt={props.plan.name}
                    borderRadius={13}
                  />
                ) : (
                  <></>
                )}
              </Center>
            )
          ) : (
            <></>
          )}
          <Box px={4}>
            {props.plan.city !== "undefined" ? (
              <Text
                fontWeight="bold"
                color={useColorModeValue(MainBlack, MainWhite)}
                fontSize="xl"
                isTruncated
                pt={props.plan.photos != undefined ? 1 : 0}
              >
                {props.plan.city}
              </Text>
            ) : (
              <></>
            )}
            {props.plan.url !== "undefined" ? (
              <Link
                href={urlParser(props.plan.url)}
                isExternal
                _text={{
                  color: "blue.400",
                }}
                py={1}
              >
                {props.plan.url}
              </Link>
            ) : (
              <></>
            )}
            {props.plan.phone !== "undefined" ? (
              <Pressable
                onPress={() => {
                  Linking.openURL(`tel:${props.plan.phone}`);
                }}
                py={1}
              >
                <Text color="green.600">{props.plan.phone}</Text>
              </Pressable>
            ) : (
              <></>
            )}
            {props.plan.address !== "undefined" ? (
              <Text>{props.plan.address}</Text>
            ) : (
              <></>
            )}
            {props.plan.categories !== "undefined" ? (
              <Text>{props.plan.categories}</Text>
            ) : (
              <></>
            )}
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default CardModal;
