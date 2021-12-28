function MainMenu ({ signOut, user }) {
    return (
        <>
        <button class = 'HomeButton' onClick={signOut}>Sign out</button>
        <h1 class = 'header'>Hello</h1>
        <div class = 'SubSec'>
          <h2>Choose Action</h2>
          <ul>
            <li><button class = 'ChoiceButton' onClick={() => 1}>Add New Patient</button></li>
            <li><button class = 'ChoiceButton' onClick={() => 1}>Find Patient</button></li>
            <li><button class = 'ChoiceButton' onClick={() => 1}>Link Patient to Vendor</button></li>
          </ul>
        </div>
        </>
    );
};

export default MainMenu;