import React from 'react';
import { FaPlane } from 'react-icons/fa';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Heading,
  Box
} from 'grommet';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react';

export default function ShowFlights({ air, fromAir, toAir, timeLeft, timeLand, gateD, gateA, terminalA, terminalD, num, stat }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box style={{paddingLeft: "3%"}} gap="small" align="center" direction="row" pad="small" {...rest}>
      {children}
      <Box>
        <Text size={size} weight="bold">
          {title}
        </Text>
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
  );

  return (
    <>
      <Card style={{backgroundColor: "#F5F3E7"}}>
        <CardBody pad="small" onClick={onOpen}>
          <CardHeader width={"100%"}>
            <span style={{padding: "3%", width: "100%"}}>
              <FaPlane style={{height: "2%", width: "3%"}} />
              <Heading size='small' weight={"bolder"} style={{ paddingTop: "2%"}}>{air} - Flight #{num}</Heading>
            </span>
          </CardHeader>
            <Identifier
              title={`From: ${fromAir} - To: ${toAir}`}
              subTitle={`Takeoff: ${timeLeft} - Land: ${timeLand}`}
              size="medium"
            >
            </Identifier>
          <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
            <span><Text weight={"bolder"}>Status: </Text><Text style={{ color: stat === "active" ? "green" : "#E4CC33" }}>{stat}</Text></span>
          </CardFooter>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{air} - Flight #{num}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text weight={"bolder"}>Airline: </Text><Text>{air}</Text>
            <br />
            <Text weight={"bolder"}>From: </Text><Text>{fromAir}</Text>
            <br />
            <Text weight={"bolder"}>Departure Terminal and Gate: </Text><Text>{`Terminal ${terminalD} - ${gateD}`}</Text>
            <br />
            <Text weight={"bolder"}>To: </Text><Text>{toAir}</Text>
            <br />
            <Text weight={"bolder"}>Arrival Terminal and Gate: </Text><Text>{`Terminal ${terminalA} - ${gateA}`}</Text>
            <br />
            <Text weight={"bolder"}>Takeoff: </Text><Text>{timeLeft}</Text>
            <br />
            <Text weight={"bolder"}>Arrival: </Text><Text>{timeLand}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}