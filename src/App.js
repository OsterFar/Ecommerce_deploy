
//Chakra UI 

import {Container , Text , Divider , Box , Image , Button , SimpleGrid , Flex} from "@chakra-ui/react" ;
import {FiShoppingCart , FiShoppingBag } from 'react-icons/fi' ;
import { useState, useEffect } from "react";
import Butter from "buttercms";

console.log(process.env.REACT_APP_BUTTER_ECOMMERCE);
const butter = Butter('655171250901dfdacd4aa71ae82eed452e27b226');

function App() {
  console.log(butter) ;
   const [products, setProducts] = useState([]);  useEffect(() => {
    async function fetchData() {
      const res = await butter.content.retrieve(["cookies"], {
        order: "name",
      });
      const { data } = await res.data;
      const allProducts = data.cookies;
      setProducts(allProducts);
      console.log(allProducts);
    }
    fetchData();
  }, []);


  return ( 
      <>
        <Container maxW="container.xl" h="100vh" >
          {/* This is for Header area  */}
          <Flex justifyContent="space-between" alignContent="center" >
            <Text color="white !important"as="a" href= "/" fontSize="2rem" color="gray.900" fontFamily = "Robo" my="5px" >
              Products 
            </Text>

            <Button my="5px" colorScheme = "green " variant="ghost" leftIcon = {<FiShoppingBag size = "24px"/>} 
            className="snipcart-checkout" 
            >
              View
            </Button>
          </Flex>
          <Divider /> {/* Used to seperate lines */}

          {/* Product loop from here  */}
          <Box mt={4} >
            <SimpleGrid minChildWidth ="300px" align="center" justify="center" spacing="40px" mb={32}>
              {products.map((product)=> (
                <Box bg="13233a" maxW = "sm" borderWidth = "1px" rounded="lg" shadow="lg" _hover={{shadow:"dark"}} key={product.id} >
                  <Image h="350px" fit="cover" src={product.image} alt={'Picture of ${product.name'} roundedTop = "lg" />
                  <Box p="6">
                    {/* Heading of each cart product   */}
                    <Flex mt="1" justifyContent = "space-between" alignContent = "center">

                      <Text color="black" fontSize= "2xl" fontWeight="semibold" as="h4" textTransform="uppercase" lineHeight="tight" fontFamily = "Roboto">
                        {product.name}
                      </Text>

                      <Text as="h4" fontSize="2x1" fontWeight = "bold" color="teal.600" > 
                        ${product.price}
                      </Text>
                    </Flex>

                    <Text  mt={4} color="gray.500" display={{base:"none" , md:"flex"}}>
                      {product.description}
                    </Text>
                    {/* this btn will open cart and require some parms which we pass below */}
                    <Button leftIcon ={<FiShoppingCart size="24px" /> } size="lg" mt={4} isFullWidth colorScheme="blue" variant="outline" alignSelf = {"center"} 
                    className = "snipcart-add-item" data-item-id = {product.id} data-item-image={product.image} data-item-name={product.name} data-item-url="/"
                    data-item-description ={product.description} data-item-price = {product.price}
                    >
                        Add To Cart
                    </Button>

                  </Box>
                </Box> 
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </>  
  );
}
export default App;