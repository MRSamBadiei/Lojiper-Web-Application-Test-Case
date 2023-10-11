# Lojiper Web Application Test Case

Bus ticket sales application with certain basic features.

# Installation

```bash
git clone https://github.com/MRSamBadiei/Lojiper-Web-Application-Test-Case.git
cd Lojiper-Web-Application-Test-Case
npm i
npm run dev
```

## Technical Information

**FrameWork:** NextJS (13.5.4)\
**Database:** Firebase (10.4.0)\
**Language:** Typescript (5)\
**Authentication:** Next-auth (4.23.2)\
**API:** Static Context API & Next Route API

## API Reference

#### Get all Paths

```http
  GET /api/path
```

| Parameter     |
| :------------ |
| no parameters |

| Responses        |
| :--------------- |
| Status code: 200 |

```json
// JSON Example
[
  {
    "DepartureLocation": "Istanbul",
    "Destination": "Ankara",
    "Date": 1697373892,
    "Price": 200,
    "Seats": [
      { "seat": 1, "gender": "Male" },
      { "seat": 20, "gender": "Female" },
      { "seat": 13, "gender": "Male" },
      { "seat": 18, "gender": "Female" }
    ]
  },
  ....
]
```

#### Users

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

### Sign IN Page

![Tux, the Linux mascot](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2020.26%201.jpg?alt=media&token=c1de867d-5ca9-4f52-81dc-4d8f7551f5f3&_gl=1*fg9nff*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0NTQyNi4xMi4xLjE2OTcwNDYwMTIuMTEuMC4w)

- First enter your email address then your password and click sign in.
- if you are a new user click sign up to register.
- After you enter your email address and password and click sign in, if you email address does not exists you automatically redirect to Sign up page.
- you will get an error message if your email and password does not match
- if you information is correct you will redirect to Home page

## Sign up Page

### Personal info

![Tux, the Linux mascot](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2020.42%201.jpg?alt=media&token=2cd84d5f-0e73-4363-beb3-aff7eb61bac7&_gl=1*1fy5plf*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0NTQyNi4xMi4xLjE2OTcwNDYyMjkuMzYuMC4w)

- Enter your first name, last name, gender and date of birth and click next.

### Register

![Tux, the Linux mascot](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2020.42%202.jpg?alt=media&token=f7c5b916-3475-49f1-86c6-b75c26d2c8c6&_gl=1*13xpjgq*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0NTQyNi4xMi4xLjE2OTcwNDYzMTUuNjAuMC4w)

- Enter your email, password and confirm your password and click sign up
- password must be atleast 6 character
- Redirection to login page in case of successful registration

## Home Page

![Home page](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2021.31%201.jpg?alt=media&token=3add7076-7019-4814-9168-fc24412e32d3&_gl=1*1gk16h0*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0OTE1My4xMy4xLjE2OTcwNDkxNjQuNDkuMC4w)

- After a successful login you will automatically redirect to Home page

## Home Page

![Search](<https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2021.31%201%20(1).jpg?alt=media&token=9ce8cc45-f141-4264-b6e7-506d087bdd24&_gl=1*10iifyo*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0OTE1My4xMy4xLjE2OTcwNDkzODQuNTEuMC4w>)

- On Home page the user will enter information about the voyage.
- There will be 3 entries and all of them will be mandatory.
- Warning message if any of them is empty will be given.
- inputs contain
  - Departure location - (Select Box).
  - Destination - (Select Box).
  - Date - (Datepicker).
- The flights will be listed with the Search button.

- after you fill all the inputs click on search for query result.

## Query Results

![Search](<https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2021.31%201%20(2).jpg?alt=media&token=8a63f2e2-9804-4bef-8e55-6dc96cce4bb6&_gl=1*18k6axr*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0OTE1My4xMy4xLjE2OTcwNDk3MzIuNDkuMC4w>)

- data will be listed according to the information entered on the homepage.
- From which city to which city on which date, how many seats are available and the price

- If there is no suitable voyage for the information entered by the user, it will not give an error. warning will be given.

- Clicking on one of the listed will show ticket sales

## Query Results

![Ticket](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2021.46%201.jpg?alt=media&token=cc2974b0-c221-402c-b997-0817c37919ea&_gl=1*1s8rxu2*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0OTE1My4xMy4xLjE2OTcwNTAwMTkuNDMuMC4w)

- Trip details and price will be displayed.
- Seat selection will be made on this page.

![Ticket](https://firebasestorage.googleapis.com/v0/b/bus-ticket-d6b60.appspot.com/o/Screenshot%202023-10-11%20at%2021.49%201.jpg?alt=media&token=8abb8674-5e9d-44ee-9bad-1f65f65c2774&_gl=1*nlw09x*_ga*NDM2MTkxODA1LjE2OTYxNzAxNDI.*_ga_CW55HF8NVT*MTY5NzA0OTE1My4xMy4xLjE2OTcwNTAyMTMuNTEuMC4w)

- Seats can be occupied or unoccupied, in occupied seats, the type of person will be indicated by icon or color.
- A maximum of 5 seats can be selected, if you want to select the 6th seat, toast message as warning will be given.
- If two seats next to each other are not taken together, you cannot sit next to the opposite sex. Gender information

- As the user makes seat selections, the fare field will be updated and displayed. The same When you cancel in the same way, the fee field will be updated.

- The Continue button will redirect to the payment page.
