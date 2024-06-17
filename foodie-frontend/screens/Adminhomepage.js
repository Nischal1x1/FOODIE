import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import TextFieldComponent from '../components/textfieldcomponent';
import CardComponent from '../components/cardcomponent';
import styles from '../components/styles';
import TouchableOpacity from '../components/touchablecomponent';
import axios from 'axios';
import ipAddress from '../ipaddress/ipAddressInfo';
import Toast from 'react-native-toast-message';

const { textField, text, button } = styles;

const Adminhomepage = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sides, setSides] = useState('');
 
  const [foodItems, setFoodItems] = useState([]); 
  function handleSubmit() {
    const foodData = {
      foodname: itemName,
      description: description,
      price: price,
      sides: sides,
     
    };

    axios.post(`${ipAddress}/fooditem`, foodData)
      .then((res) => {
        if (res.data.success) {
          Toast.show({
            type: 'customSuccess',
            text2: 'Food Item Created',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true,
          });
        
          setFoodItems([...foodItems, foodData]);
        }
      })
      .catch(e => {
        Toast.show({
          type: 'customError',
          text2: 'System Failed',
          visibilityTime: 2000,
          autoHide: true,
          swipeable: true,
        });
      });
  }

  return (
    <ScrollView>
      <TextFieldComponent
        primarytext={'Item Name'}
        textfieldstyle={textField.field}
        onchange={e => setItemName(e.nativeEvent.text)}
      />
      <TextFieldComponent
        primarytext={'Description'}
        textfieldstyle={textField.field}
        onchange={e => setDescription(e.nativeEvent.text)}
      />
      <TextFieldComponent
        primarytext={'Price'}
        textfieldstyle={textField.field}
        onchange={e => setPrice(e.nativeEvent.text)}
      />
      <TextFieldComponent
        primarytext={'Sides'}
        textfieldstyle={textField.field}
        onchange={e => setSides(e.nativeEvent.text)}
      />
      <TextFieldComponent
        primarytext={'Image URL'}
        textfieldstyle={textField.field}
        onchange={e => setFoodImage(e.nativeEvent.text)}
      />
      <TouchableOpacity
        onpress={() => handleSubmit()}
        button={[button.genericbutton, button.borderradius10]}
        text={'Add Item'}
        texttype={[text.generictype, text.whitetext, text.type18]}
      />
      
        {foodItems.map((item, index) => (
          <CardComponent
            key={index}
            foodName={item.foodname}
            price={item.price}
            description={item.description}
            sides={item.sides}
          />
        ))}
     
    
    </ScrollView>
  );
};

export default Adminhomepage;
