import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Subject options for dropdown
  const subjectOptions = [
    { value: '', label: 'Select a subject...' },
    { value: 'job-opportunity', label: 'Job Opportunity' },
    { value: 'freelance-project', label: 'Freelance Project' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'question', label: 'General Question' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'custom', label: 'Other (Custom)' }
  ];

  // Validation regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const subjectRegex = /^.{3,100}$/;
  const messageRegex = /^.{10,1000}$/;

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (submitStatus && submitStatus !== 'validation-error') {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setTimeout(() => setSubmitStatus(''), 300); // Wait for fade out animation
      }, 5000);
      
      return () => clearTimeout(timer);
    } else if (submitStatus === 'validation-error') {
      setShowNotification(true);
    }
  }, [submitStatus]);

  const dismissNotification = () => {
    setShowNotification(false);
    setTimeout(() => setSubmitStatus(''), 300);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!nameRegex.test(value.trim())) {
          error = 'Name must be 2-50 characters, letters only';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'subject':
        if (!value.trim()) {
          error = 'Please select a subject';
        }
        break;
      
      case 'customSubject':
        if (formData.subject === 'custom' && !value.trim()) {
          error = 'Please enter a custom subject';
        } else if (formData.subject === 'custom' && value.trim() && !subjectRegex.test(value.trim())) {
          error = 'Custom subject must be 3-100 characters';
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (!messageRegex.test(value.trim())) {
          error = 'Message must be 10-1000 characters';
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('validation-error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuration - You'll need to replace these with your actual EmailJS credentials
      const serviceId = 'service_za63y0a'; // Replace with your EmailJS service ID
      const templateId = 'template_99kfdql'; // Replace with your EmailJS template ID
      const publicKey = 'olAur_3TIkFif4K7x'; // Replace with your EmailJS public key

      // Get the final subject value - use custom subject if selected, otherwise use the option label
      const finalSubject = formData.subject === 'custom' 
        ? formData.customSubject 
        : subjectOptions.find(option => option.value === formData.subject)?.label || formData.subject;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: finalSubject,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', customSubject: '', message: '' });
      setErrors({}); // Clear any validation errors
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
          
          <ul className={styles.links}>
            <li className={styles.link}>
              <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
              <a href="mailto:walhamohamedali@gmail.com">walhamohamedali@gmail.com</a>
            </li>
            <li className={styles.link}>
              <img
                src={getImageUrl("contact/linkedinIcon.png")}
                alt="LinkedIn icon"
              />
              <a href="https://www.linkedin.com/in/walha-med-ali/">linkedin.com/in/walha-med-ali</a>
            </li>
            <li className={styles.link}>
              <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
              <a href="https://github.com/M3dnux">github.com/M3dnux</a>
            </li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>Send me a message</h3>
          
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your Name (2-50 characters, letters only)"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              required
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Your Email (example@domain.com)"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              required
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
              required
            >
              {subjectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
          </div>

          {formData.subject === 'custom' && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="customSubject"
                placeholder="Enter custom subject (3-100 characters)"
                value={formData.customSubject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.customSubject ? styles.inputError : ''}`}
                required
              />
              {errors.customSubject && <span className={styles.errorText}>{errors.customSubject}</span>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <textarea
              name="message"
              placeholder="Your Message (10-1000 characters)"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              rows="5"
              required
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            <div className={styles.charCount}>
              {formData.message.length}/1000 characters
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus && (
            <div className={`${styles.notification} ${
              submitStatus === 'success' ? styles.notificationSuccess :
              submitStatus === 'error' ? styles.notificationError :
              styles.notificationWarning
            } ${showNotification ? styles.notificationShow : styles.notificationHide}`}>
              <div className={styles.notificationIcon}>
                {submitStatus === 'success' ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.iconSvg}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : submitStatus === 'error' ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.iconSvg}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" className={styles.iconSvg}>
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className={styles.notificationContent}>
                <h4>
                  {submitStatus === 'success' ? 'Message Sent Successfully!' :
                   submitStatus === 'error' ? 'Failed to Send Message' :
                   'Please Check Your Input'}
                </h4>
                <p>
                  {submitStatus === 'success' ? 'Thank you for reaching out! I\'ll get back to you within 24 hours.' :
                   submitStatus === 'error' ? (
                     <>Please try again or contact me directly at <a href="mailto:walhamohamedali@gmail.com" className={styles.notificationLink}>walhamohamedali@gmail.com</a></>
                   ) : 'Fix the highlighted errors above before submitting.'}
                </p>
              </div>
              {submitStatus !== 'validation-error' && (
                <button 
                  className={styles.notificationClose}
                  onClick={dismissNotification}
                  aria-label="Close notification"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </footer>
  );
};