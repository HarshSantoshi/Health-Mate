export const paymenthandler = async (amount) => {
  
    const currency = 'INR';
    const receiptId = '1234567890';
  
    const response = await fetch("https://health-mate-server.vercel.app/api/v1/payment/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount, currency, receipt: receiptId }),
    });
  
    const order = await response.json();
    console.log('order', order);
  
    return new Promise((resolve, reject) => {
        var option = {
            key: "",
            amount,
            currency,
            name: "HealthMate",
            description: "Test Transaction",
            image: "https://yourdomain.com/profile.png",
            order_id: order.id,
            handler: async function (response) {
  
                const body = { ...response }
  
                try {
                    const validateResponse = await fetch('https://health-mate-server.vercel.app/api/v1/payment/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
  
                    const jsonResponse = await validateResponse.json();
                    console.log('jsonResponse', jsonResponse);
                    resolve(true); // Resolve the Promise with true if payment is successful
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    reject(false); // Reject the Promise with false if there's an error
                }
            },
            prefill: {
                name: "Harsh",
                email: "hk@example.com",
                contact: "9000000000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        }
  
        var rzp1 = new window.Razorpay(option);
        rzp1.on("payment.failed", function (response) {
            
            alert(response.error.description);
            
            reject(false); // Reject the Promise with false if payment fails
        });
  
        rzp1.open();
    });
  }