import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Step1 from '../../components/wizard/Step1';
import Step2 from '../../components/wizard/Step2';
import Step3 from '../../components/wizard/Step3';

interface FormData {
  name: string;
  age: string;
  phone: string;
  address: string;
}

const WizardForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSetErrors = useCallback((currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Vui lòng nhập họ và tên';
        isValid = false;
      }
      if (!formData.age) {
        newErrors.age = 'Vui lòng nhập tuổi';
        isValid = false;
      } else if (parseInt(formData.age, 10) < 1 || parseInt(formData.age, 10) > 120) {
        newErrors.age = 'Tuổi phải từ 1 đến 120';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.phone) {
        newErrors.phone = 'Vui lòng nhập số điện thoại';
        isValid = false;
      } else if (formData.phone.length < 10) {
        newErrors.phone = 'Số điện thoại phải có ít nhất 10 số';
        isValid = false;
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Vui lòng nhập địa chỉ';
        isValid = false;
      } else if (formData.address.trim().length < 10) {
        newErrors.address = 'Địa chỉ quá ngắn';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const isCurrentStepValid = useMemo(() => {
    if (step === 1) {
      const isNameValid = formData.name.trim() !== '';
      const isAgeValid = formData.age && parseInt(formData.age, 10) >= 1 && parseInt(formData.age, 10) <= 120;
      return isNameValid && isAgeValid;
    }
    if (step === 2) {
      const isPhoneValid = formData.phone.length >= 10;
      const isAddressValid = formData.address.trim().length >= 10;
      return isPhoneValid && isAddressValid;
    }
    return true;
  }, [step, formData]);

  const handleNext = useCallback(() => {
    if (step < 3) {
      if (validateAndSetErrors(step)) {
        setStep(step + 1);
        setErrors({}); 
      }
    } else {
      Alert.alert(
        'Đăng ký thành công',
        'Cảm ơn bạn đã đăng ký!',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({ name: '', age: '', phone: '', address: '' });
              setErrors({});
              setStep(1);
            },
          },
        ]
      );
    }
  }, [step, validateAndSetErrors]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({}); 
    }
  }, [step]);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={{ name: formData.name, age: formData.age }} onChange={handleChange} errors={errors} />;
      case 2:
        return <Step2 data={{ phone: formData.phone, address: formData.address }} onChange={handleChange} errors={errors} />;
      case 3:
        return <Step3 data={formData} />;
      default:
        return null;
    }
  };

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3].map((item, index) => (
        <React.Fragment key={item}>
          <View style={[styles.progressStep, step >= item ? styles.activeStep : styles.inactiveStep]}>
            <Text style={[styles.stepNumber, step >= item ? styles.activeStepText : styles.inactiveStepText]}>
              {item}
            </Text>
          </View>
          {index < 2 && <View style={[styles.progressLine, step > item ? styles.activeLine : {}]} />}
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>ĐĂNG KÝ THÔNG TIN</Text>
        {renderProgress()}
        <View style={styles.formContainer}>{renderStep()}</View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={20} color="#3498db" />
            <Text style={[styles.buttonText, { color: '#3498db' }]}>Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.nextButton, !isCurrentStepValid && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isCurrentStepValid}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>{step === 3 ? 'Hoàn tất' : 'Tiếp theo'}</Text>
          {step < 3 && <MaterialIcons name="arrow-forward" size={20} color="white" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { flexGrow: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 30, textTransform: 'uppercase', letterSpacing: 1 },
  progressContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30, paddingHorizontal: 20 },
  progressStep: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#bdc3c7' },
  activeStep: { backgroundColor: '#3498db', borderColor: '#3498db' },
  inactiveStep: { backgroundColor: 'white' },
  stepNumber: { fontWeight: 'bold', fontSize: 18 },
  activeStepText: { color: 'white' },
  inactiveStepText: { color: '#7f8c8d' },
  progressLine: { flex: 1, height: 3, backgroundColor: '#bdc3c7' },
  activeLine: { backgroundColor: '#3498db' },
  formContainer: { flex: 1, width: '100%' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderTopWidth: 1, borderTopColor: '#ecf0f1', backgroundColor: 'white' },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, minWidth: 120 },
  backButton: { backgroundColor: 'white' },
  nextButton: { backgroundColor: '#3498db', marginLeft: 'auto' },
  disabledButton: { backgroundColor: '#bdc3c7' },
  buttonText: { fontSize: 16, fontWeight: '600', marginHorizontal: 4 },
});

export default WizardForm;
