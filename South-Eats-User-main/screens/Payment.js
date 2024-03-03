import React, { useState } from "react";
import { Text, View } from 'react-native';
import TextButton from "../components/Payment/TextButton";
import FormInput from "../components/Payment/FormInput";
import FormInputCheck from "../components/Payment/FormInputCheck";
import { validationCheck } from "../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FONTS, SIZES, COLORS } from "../constants/theme";
import styles from "../assets/Style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore';

// PAYMENT SCREEN

const Payment = ({ navigation, route }) => {

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState(0);
  const [phoneError, setPhoneError] = useState(0);
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [apartment, setApartment] = useState('');
  const [apartmentError, setApartmentError] = useState('');
  const [floor, setFloor] = useState('');
  const [floorError, setFloorError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerIdError, setCustomerIdError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardHolderError, setCardHolderError] = useState('');

  const [valid, setValid] = useState('');
  const [validError, setValidError] = useState('');

  const [cvv, setCVV] = useState('');
  const [cvvError, setCVVError] = useState('');

  const data = [
    { label: 'Ashkelon', value: 'Ashkelon' },
    { label: 'Beer-Sheva', value: 'Beer-Sheva' },
    { label: 'Ashdod', value: 'Ashdod' },

  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>

        </Text>
      );
    }
    return null;
  };

  function isEnable() {
    return cardNumber != "" && cardHolder != "" && valid != "" && cvv != "" &&
      fullName != "" && email != "" && phone != "" && state != "" && city != "" && apartment != "" && floor != "" && address != "" &&
      cardNumberError == "" && cardHolderError == "" && validError == "" && cvvError == "" &&
      fullNameError == "" && emailError == "" && phoneError == "" && stateError == ""
      && cityError == "" && addressError == "" && apartmentError == "" && floorError == "";
  }

  const handleOnPressNext = () => {
    if (isEnable()) {

      console.log("route.params.orderId", route.params.orderId);

      firestore().collection("orders")
        .doc(route.params.orderId)
        .update({
          name: fullName,
          city: city,
          address: address,
          floor: floor,
          apartment: apartment,
          phone: phone,
          city:value
        }).then(() => {
          navigation.replace("OrderCompleted")
        });
    } else {
      alert("Not all fields were filled")
    }
  }

  function renderForm() {
    return (
      <View
        style={{ marginTop: SIZES.padding }}
      >
        <Text style={{ ...FONTS.h4, marginBottom: 10 }}>Information Details:</Text>
        <FormInput
          label="Full Name"
          value={fullName}
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setFullNameError)
            setFullName(value)
          }}
          errorMsg={setFullNameError}
          appendComponent={
            <FormInputCheck
              value={fullName}
              error={fullNameError}
            />
          }
        />
        <FormInput
          label="Email:"
          value={email}
          onChange={(value) => {
            validationCheck.validateEmail(value, setEmailError)
            setEmail(value)
          }}
          errorMsg={setEmailError}
          appendComponent={
            <FormInputCheck
              value={email}
              error={emailError}
            />
          }
        />
        <FormInput
          label="Phone:"
          maxLength={10}
          value={phone}
          keyboardType="number-pad"
          onChange={(value) => {
            validationCheck.validateInput(value, 10, setPhoneError)
            setPhone(value)
          }}
          errorMsg={setPhoneError}
          appendComponent={
            <FormInputCheck
              value={phone}
              error={phoneError}
            />
          }
        />
        <FormInput
          label="State:"
          value={state}
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setStateError)
            setState(value)
          }}
          appendComponent={
            <FormInputCheck
              value={state}
              error={stateError}
            />
          }
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>City</Text>

        </View>
        <View style={styles2.container}>
          {renderLabel()}
          <Dropdown
            style={[styles2.dropdown, isFocus && { borderColor: 'blue' }]}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select city' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              // validationCheck.validateInput(value,1,setCityError)
              setCity(value)

            }}

          />
        </View>

         <FormInput
          label="Apartment:"
          maxLength={4}
          value={apartment}
          keyboardType="number-pad"
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setApartmentError)
            setApartment(value)
          }}
          errorMsg={setApartmentError}
          appendComponent={
            <FormInputCheck
              value={apartment}
              error={apartmentError}
            />
          }
        />
          <FormInput
          label="Floor:"
          maxLength={4}
          value={floor}
          keyboardType="number-pad"
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setFloorError)
            setFloor(value)
          }}
          errorMsg={setFloorError}
          appendComponent={
            <FormInputCheck
              value={floor}
              error={floorError}
            />
          }
        />


        <FormInput
          label="Address:"
          value={address}
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setAddressError)
            setAddress(value)
          }}
          appendComponent={
            <FormInputCheck
              value={address}
              error={addressError}
            />
          }
        />
        <Text style={{ ...FONTS.h4, marginTop: 20, marginBottom: 10 }}>Card Details:</Text>
        <FormInput
          label="Card Number"
          keyboardType="number-pad"
          value={cardNumber}
          maxLength={19}
          onChange={(value) => {
            setCardNumber(value.replace(/\s/g, '').replace
              (/(\d{4})/g, '$1 ').trim())  //Every 4 numbers adds space
            validationCheck.validateInput(value, 19, setCardNumberError)
          }}
          errorMsg={cardNumberError}
          appendComponent={
            <FormInputCheck
              value={cardNumber}
              error={cardNumberError}
            />
          }
        />
        <FormInput
          label="Cardholder Name"
          value={cardHolder}
          onChange={(value) => {
            validationCheck.validateInput(value, 1, setCardHolderError)
            setCardHolder(value)
          }}
          errorMsg={setCardHolderError}
          appendComponent={
            <FormInputCheck
              value={cardHolder}
              error={cardHolderError}
            />
          }
        />
        <FormInput
          label="Identification Number:"
          value={customerId}
          keyboardType="number-pad"
          maxLength={9}
          onChange={(value) => {
            validationCheck.validateInput(value, 8, setCustomerIdError)
            setCustomerId(value)
          }}
          errorMsg={setCustomerIdError}
          appendComponent={
            <FormInputCheck
              value={customerId}
              error={customerIdError}
            />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius
          }}>
          <FormInput
            label="Expiry Date:"
            value={valid}
            placeholder="MM/YY"
            maxLength={5}
            containerStyle={{
              flex: 1
            }}
            onChange={(value) => {
              validationCheck.validateInput(value, 5, setValidError)
              setValid(value)
            }}
            appendComponent={
              <FormInputCheck
                value={valid}
                error={validError}
              />
            }
          />
          <FormInput
            label="CVV:"
            value={cvv}
            maxLength={3}
            keyboardType="number-pad"
            containerStyle={{
              flex: 1,
              marginLeft: SIZES.radius
            }}
            onChange={(value) => {
              validationCheck.validateInput(value, 3, setCVVError)
              setCVV(value)
            }}
            appendComponent={
              <FormInputCheck
                value={cvv}
                error={cvvError}
              />
            }
          />
        </View>
      </View>

    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={styles.paymentContainer}>

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: SIZES.padding }}
        >
          {renderForm()}
        </KeyboardAwareScrollView>
        <TextButton
          label="Next"
          disabled={!isEnable()}
          buttonContainerStyle={{
            height: 55,
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnable() ? "black" : COLORS.transparentPrimray
          }}
          onPress={handleOnPressNext}
        />
      </View>
    </SafeAreaView>
  )

}

export default Payment;
const styles2 = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: SIZES.height > 800 ? 55 : 45,
    paddingHorizontal: SIZES.padding,
    //   marginTop: SIZES.height > 800? SIZES.base :0,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});