import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CORRECT_OTP = '123456'; // Default OTP for testing

export default function VerifyOTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Only allow single digit

    // Clear error state when user starts typing
    if (isError) {
      setIsError(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === CORRECT_OTP) {
      // OTP is correct, navigate to setup profile
      setIsError(false);
      router.push('/setup-profile');
    } else {
      // Show error state
      setIsError(true);
    }
  };

  const handleResend = () => {
    setTimer(180);
    setOtp(['', '', '', '', '', '']);
    setIsError(false);
    inputRefs.current[0]?.focus();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Image
          source={require('@/assets/images/solo-logo.png')}
          style={styles.headerLogo}
          contentFit="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Email Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="email" size={48} color={COLORS.accent} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify Your Email</Text>

        {/* Description */}
        <Text style={styles.description}>
          We sent a 6-digit code to{' '}
          <Text style={styles.email}>john@gmail.com</Text>
        </Text>

        {/* Wrong Email Link */}
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.wrongEmail}>Wrong email? Go back</Text>
        </TouchableOpacity>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && !isError && styles.otpInputFilled,
                isError && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Error Message */}
        {isError && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="alert-circle" size={20} color="#ef4444" />
            <Text style={styles.errorText}>Incorrect code. Try again.</Text>
          </View>
        )}

        {/* Timer */}
        <Text style={styles.timer}>Code expires in {formatTime(timer)}</Text>

        {/* Resend Code */}
        <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text style={[styles.resendCode, timer > 0 && styles.resendCodeDisabled]}>
            Resend Code
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.9}
        >
          <Text style={styles.verifyButtonText}>Verify & Proceed</Text>
        </TouchableOpacity>

        {/* Spam Folder Note */}
        <Text style={styles.spamNote}>
          Didn't get the code?{'\n'}Check your spam folder.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(15, 230, 51, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  wrongEmail: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: COLORS.accent,
  },
  otpInputError: {
    borderColor: '#ef4444',
    color: '#ef4444',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
  timer: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  resendCode: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 40,
  },
  resendCodeDisabled: {
    color: COLORS.textMuted,
    opacity: 0.5,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  spamNote: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
