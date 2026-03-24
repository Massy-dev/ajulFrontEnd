//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import UserForm from "./pages/users/UserForm";
import Login from "./pages/users/Login";
import './App.css'
import PrivateRoute from "./components/PrivateRoute";
import PaymentForm from "./pages/payments/PaymentForm";
import PaymentList from "./pages/payments/PaymentList";
import PaymentEdit from "./pages/payments/PaymentEdit"
import MembersInDebt from "./pages/members/MembersInDebt";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import TreasurerDashboard from "./pages/dashboard/TreasurerDashboard";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import CategoryForm from "./pages/cotisation/CategoryForm";
import CategoryList from "./pages/cotisation/CategoryList";
import Home from "./pages/Home";
import MemberPaymentList from "./pages/payments/MemberPaymentList";

function App() {
 return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<Home />} />
      
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/users"
          element={
            <PrivateRoute>
               <UsersList  role={String} children={undefined} />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/new"
          element={
            <PrivateRoute>
              <UserForm  role={String} children={undefined} />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <PrivateRoute>
              <UserForm  role={String} children={undefined} />
            </PrivateRoute>
          }
        />

        <Route
          path="/category"
          element={
            <PrivateRoute>
              <CategoryList role={String} children={undefined} />
            </PrivateRoute>
          }
        />

        <Route
          path="/category/new"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/category/:id/edit"
          element={
            <PrivateRoute>
              <CategoryForm />
            </PrivateRoute>
          }
        />

      {/* Dashboard */}
      <Route path="/payments/dashboard" element={
        <PrivateRoute>
          <PaymentList />
        </PrivateRoute>
      } />

      <Route path="/members/:id/payment" element={
        <PrivateRoute>
          <MemberPaymentList role={String} children={undefined} />
        </PrivateRoute>
      } />

      <Route path="/payment/:id/edit" element={
        <PrivateRoute>
          <PaymentEdit role={String} children={undefined} />
        </PrivateRoute>
        } />


      <Route path="/members/in-debt" element={
              <PrivateRoute>
                <MembersInDebt />
              </PrivateRoute>
            } />

      <Route path="/dashboard/admin" element={
        <PrivateRoute>
          <AdminDashboard role={String} children={undefined} />
        </PrivateRoute>
      } />
      
      <Route path="/dashboard/treasurer" element={
        <PrivateRoute>
          <TreasurerDashboard />
        </PrivateRoute>
      } />
      
      <Route path="/dashboard/member" element={
        <PrivateRoute>
          <MemberDashboard role={String} children={undefined} />
        </PrivateRoute>
      } />

     
      </Routes>

      
     
            
      
    </BrowserRouter>
  );
}

export default App
