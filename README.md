# Attendly for JNTU-GV (Demo)

## Login
- You can log in as a **Faculty**, **HOD**, **Principal**, or **Registrar** (using the dummy users list).

---

## Faculty Dashboard
- Faculty can see **their own requests**.  
- Requests are split into:
  - **Active Requests** (still pending)  
  - **Request History** (approved or rejected)  
- Faculty can also **create new requests**.

---

## Higher Authority Dashboard (HOD / Principal / Registrar)
- Shows **Pending Requests** that need their approval.  
- Shows **Processed Requests History** (requests they already acted on).  
- Authorities can **approve or reject** requests.

---

## Request Flow
1. **Faculty submits** request  
2. **HOD reviews**  
3. **Principal reviews**  
4. **Registrar gives final approval/rejection**  

✅ Each action is stored in the request’s **history log**.

---

## Extra Features
- **Modals (popups)** for creating, viewing, and acting on requests.  
- **Status updates dynamically** when an authority approves/rejects.  
- Simple **dummy data** (`DUMMY_USERS` & `DUMMY_REQUESTS`) drives the demo.  
