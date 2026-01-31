import { supabase } from './supabase'

export async function sendOTP(phone: string) {
    const { error } = await supabase.auth.signInWithOtp({
        phone: phone, // example: +14165551234
    })

    console.log('Attempting to send OTP to:', phone)

    if (error) {
        console.error('Error sending OTP:', error.message)
        return { error }
    } else {
        console.log('OTP sent!')
        return { error: null }
    }
}

export async function verifyOTP(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
    })

    if (error) {
        console.error('Invalid OTP:', error.message)
        return { data: null, error }
    } else {
        console.log('User logged in!', data.user)
        return { data, error: null }
    }
}

export async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error) {
        console.error('Error getting user:', error.message)
        return { user: null, error }
    } else if (user) {
        console.log('Logged in user:', user.phone)
        return { user, error: null }
    }
    return { user: null, error: null }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error signing out:', error.message)
        return { error }
    } else {
        console.log('User signed out!')
        return { error: null }
    }
}
