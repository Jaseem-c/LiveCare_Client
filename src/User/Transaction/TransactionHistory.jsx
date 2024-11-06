import React, { useEffect, useState } from "react";
import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import Header from "../Header/Header";
import { getuserTransactionApi } from "../../Services/allApi";
import Feedback from "./Feedback";

function TransactionHistory() {
  const [history, setHistory] = useState([]);

  const transaction = async () => {
    try {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Fix the syntax here
        };
        const result = await getuserTransactionApi(reqHeader);
        console.log(result);
        setHistory(result.data.bills);
      }
    } catch (error) {
      console.error("Error occurred while fetching transaction:", error);
    }
  };
  console.log(history);

  useEffect(() => {
    transaction();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div className="container">
          <div className="row">
            {history?.length > 0 ? (
              history.map((item) => (
                <div className="col-lg-3 p-5 text-center" key={item?._id}>
                  <MDBCard>
                    <MDBListGroup flush>
                      <MDBListGroupItem>
                        <img
                          src={item?.profile_img}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </MDBListGroupItem>
                      <MDBListGroupItem>
                        service Provider Name: {item?.serviceProviderName}
                      </MDBListGroupItem>
                      <MDBListGroupItem>
                        amountStatus: {item?.amountStatus}
                      </MDBListGroupItem>
                      <MDBListGroupItem>
                        amountPaid: {item?.amountPaid}
                      </MDBListGroupItem>
                      <Feedback id={item?.serviceProviderId} />
                    </MDBListGroup>
                  </MDBCard>
                </div>
              ))
            ) : (
              <h1 className="text-center text-danger">
                No transaction history found
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
