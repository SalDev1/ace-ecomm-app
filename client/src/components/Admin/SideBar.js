import React from "react";
import "./SideBar.css";
import logo from "../../images/logo_2.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import {
  MdExpandMore,
  MdPostAdd,
  MdAdd,
  MdImportExport,
  MdListAlt,
  MdDashboard,
  MdPeople,
  MdRateReview,
  MdProductionQuantityLimits,
} from "react-icons/md";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <Link to='/' className='sidebarLogo'>
        <img src={logo} alt='Ecommerce' />
      </Link>

      <Link to='/admin/dashboard'>
        <p>
          <MdDashboard /> DashBoard
        </p>
      </Link>

      <div className='productsLink'>
        <TreeView
          defaultCollapseIcon={MdExpandMore}
          defaultExpandIcon={MdImportExport}>
          <TreeItem nodeId='1' label='Products' style={{ textAlign: "left" }}>
            <Link to='/admin/products'>
              <TreeItem nodeId='2' label='All' icon={<MdPostAdd />} />
            </Link>

            <Link to='/admin/product'>
              <TreeItem nodeId='3' label='Create' icon={<MdAdd />} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>

      <Link to='/admin/orders'>
        <p>
          <MdListAlt />
          Orders
        </p>
      </Link>

      <Link to='/admin/users'>
        <p>
          <MdPeople /> Users
        </p>
      </Link>

      <Link to='/admin/reviews'>
        <p>
          <MdRateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
