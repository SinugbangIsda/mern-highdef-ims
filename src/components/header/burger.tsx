const BurgerMenu = () => {
    return (
        <div className = "block lg:hidden">
            <label 
                htmlFor = "my-drawer-2" 
                className = "btn btn-circle swap swap-rotate"
            >
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
            </label>
        </div>
    )
};

export default BurgerMenu;