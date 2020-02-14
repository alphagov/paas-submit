---
kind: form
fields:
- name: email
  type: email
  label: Email Address
- name: name
  label: Name
- name: age
  type: number
  label: Age
  minimum: 16
  maximum: 65
- name: vegetable
  type: select
  label: Veggie of choice
  options:
  - text: Tomatoe
  - text: Potatoe
  - text: Carrot
    selected: true
  - text: Brussels Sprouts
    value: Brussels_Sprouts
- name: agreement
  type: checkbox
  label: Do you agree with our terms and conditions?
  options:
  - value: 1
    text: I agree
  - value: 0
    selected: true
    text: I disagree
- name: cookie
  type: radio
  label: Would you like a cookie?
  options:
  - value: 1
    text: Yes
  - value: 0
    text: No
    selected: true
- name: comments
  type: textarea
  label: Comments
  maximum: 200
---
## Get in touch

Just fill in the form, press send and we should get back to you shortly.
