# Authentication System

This directory contains the authentication components and utilities for the CyberByte application.

## Components

### AuthForm
A reusable wrapper component for authentication forms that provides consistent styling and layout.

**Props:**
- `children`: Form content
- `title`: Page title
- `subtitle`: Page subtitle
- `icon`: Icon component to display

### FormField
A reusable form input component with built-in validation styling and password toggle functionality.

**Props:**
- `label`: Field label
- `name`: Input name
- `type`: Input type
- `placeholder`: Input placeholder
- `value`: Input value
- `onChange`: Change handler
- `error`: Error message
- `icon`: Icon component
- `showPasswordToggle`: Enable password visibility toggle
- `autoComplete`: Auto-complete attribute
- `required`: Required field flag

### SubmitButton
A styled submit button with loading state support.

**Props:**
- `isLoading`: Loading state
- `loadingText`: Text to show while loading
- `children`: Button content
- `disabled`: Disabled state
- `className`: Additional CSS classes

## Context

### AuthContext
Provides authentication state and methods throughout the application.

**Methods:**
- `login(email, password)`: Authenticate user
- `register(userData)`: Register new user
- `logout()`: Sign out user
- `resetPassword(email)`: Send password reset email

**State:**
- `user`: Current user object
- `isLoading`: Loading state

## Pages

### Login (`/login`)
User authentication page with email/password form.

### Register (`/register`)
User registration page with form validation and password requirements.

### Reset Password (`/reset-password`)
Password reset request page with email form.

### Profile (`/profile`)
User profile page showing account information and settings.

## Features

- Form validation with real-time error display
- Password strength requirements
- Responsive design
- Loading states
- Error handling
- Consistent styling with the CyberByte theme
- Mobile-friendly interface
- Accessibility features

## Usage

The authentication system is automatically available throughout the app via the `AuthProvider` in the root layout. Use the `useAuth` hook to access authentication state and methods:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  // Use authentication methods
}
```
