import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

type props = {
  open: boolean;
  date: Date;
  mode: 'date' | 'time' | 'datetime';
  setDate: (date) => void;
  cancel: () => void;
};
const DateTimePicker: FC<props> = ({
  open = false,
  date,
  mode,
  setDate,
  cancel,
}) => {
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      mode={mode}
      androidVariant={'iosClone'}
      onConfirm={response => {
        setDate(response);
      }}
      onCancel={() => {
        //   setOpen(false);
        cancel();
      }}
    />
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
