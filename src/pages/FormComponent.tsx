import { useTSAccountProtection } from '@transmitsecurity/riskid-reactjs-ts';
import { BffClient } from '../utils/index';
import { useState } from 'react';

const DEFAULT_USER_ID = 'demo-user-id';


/*
  See a generic JS quick-start guide for custom implementations: https://developer.transmitsecurity.com/guides/risk/quick_start_web/ 
*/

function FormComponent() {
  const { triggerActionEvent, setAuthenticatedUser } = useTSAccountProtection();
  const [userId, setUserId] = useState(DEFAULT_USER_ID);

  const handleUserChange = (event: any) => {
    setUserId(event.target.value);
  };

  const triggerActionHandler = async (actionType: string) => {
    const actionResponse = await triggerActionEvent(actionType);
    const riskResult = await BffClient.getRiskRecommendation(actionResponse?.actionToken);
    console.log(`DRS Recommendation result for 'reservation':`, riskResult);
    const recommendation = riskResult?.recommendation?.type;
    if (recommendation) {
      alert('Success!');
    } else {
      alert('Action is forbidden!');
    }
  };

  return (
    <>
      <div>
        <input style={{ height: '29px'}} type="text" defaultValue={DEFAULT_USER_ID} onChange={handleUserChange} />
      <button
        className="action-button"
        onClick={async () => await setAuthenticatedUser(userId)} // calling setAuthenticatedUser after the user was successfully authenticated
        >
          Set User
      </button>
      <div style={{ width: '380px', marginTop: '12px' }}>
        <button
          className="action-button"
          onClick={async () => {
            await triggerActionHandler('login');
          }}
        >Login
        </button>
        <div className="separator"/>
        <button
          className="action-button"
          onClick={async () => {
            await triggerActionHandler('withdraw');
          }}
        >Withdraw
        </button>
      </div>
      </div>
    </>
  );
};

export default FormComponent;
