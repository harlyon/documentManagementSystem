import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Pagination } from 'react-materialize';
import Navbar from '../../commons/nav.component.js';
import SubNavBar from '../../commons/subNavBar.jsx';
import AllDocuments from '../../dashboard/userDashboard/allDocs.component.jsx';

import PublicDocuments from
'../../dashboard/userDashboard/publicDocs.component.jsx';
import RoleDocuments from
'../../dashboard/userDashboard/roleDocs.component.jsx';
import MyDocuments from '../../dashboard/userDashboard/myDocs.component.jsx';
import EditDocumentModal from '../../modals/editDocForm.component.jsx';
import EditDocumentAction from
'../../../actions/documentManagement/editDocument.js';
import DeleteDocumentAction from
'../../../actions/documentManagement/deleteDocuments';
import Search from '../userDashboard/search.component.jsx';

/**
 * User dashboard
 * @class UserDashboard
 * @extends {Component}
 */
class UserDashboard extends Component {
  /**
   * Creates an instance of UserDashboard.
   * @param {Object} props 
   * @memberof UserDashboard
   */
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.setViewDocument = this.setViewDocument.bind(this);
    this.handleSearchBarView = this.handleSearchBarView.bind(this);
    this.state = {
      documents: props.documents || [],
      searchBarView: 'noShow',
    };
  }
  /**
   * @param {Object} view 
   * @memberof UserDashboard
   */
  handleSearchBarView(view) {
    this.setState({ searchBarView: view });
    $('ul.tabs').tabs('select_tab', 'searchTab');
  }
  /**
   * @param {Object} document 
   * @memberof UserDashboard
   */
  setViewDocument(document) {
    this.setState({
      viewTitle: document.title,
      viewDocument: document.content,
      documentId: document.id
    });
  }
  /**
   * @param {Object} nextProps 
   * @memberof AdminDashboard
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents,
    });
  }
  /**
   * @param {Object} document 
   * @memberof UserDashboard
   */
  setEditDocument(document) {
    this.setState({
      editDocument: document,
      documentId: document.id
    });
  }
  /**
   * @param {Function} callback
   * @param {Object} documentId
   * @memberof UserDashboard
   */
 setDeleteDocument(callback, documentId) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: true
    },
    function(){
      callback(documentId);
    });
  }
  /**
   * @memberof UserDashboard
   */
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  /**
   * @returns {void} returns user dashboard page
   * @memberof UserDashboard
   */
  render() {
    return (
      <div>
        <div id="modalEdit" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Edit Document</h4>
            <EditDocumentModal
              document={this.state.editDocument || null}
              documentId={this.state.documentId || null}
              onEdit={this.props.EditingDocument} />
          </div>
          <div className="modal-footer">
            <a
              className="modal-action modal-close waves-effect waves-green btn-flat ">
              Close
            </a>
          </div>
        </div>
        <div id="modalView" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="center">View Document</h4>
            <h5>Title</h5>
            <div>{ this.state.viewTitle }</div>
            <h5>Content</h5>            
            <div dangerouslySetInnerHTML={{ __html: this.state.viewDocument}} />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat ">
              Close
            </a>
          </div>
        </div>

        <div className="main-container">
          <div className="bg"></div>
          <Navbar />
          <SubNavBar handleSearchBarView={this.handleSearchBarView} />
          <div className="row">
            <div className="tab-row">
              <ul className="tabs tabs-fixed-width">
                <li className="tab">
                  <Link
                    to="#allDocuments"
                    className="active">
                    All Documents
                  </Link>
                </li>
                <li className="tab">
                  <Link to="#publicDocuments">Public Documents</Link>
                </li>
                <li className="tab">
                  <Link to="#roleDocuments">Role Documents</Link>
                </li>
                <li className="tab">
                  <Link to="#ownerDocuments" id="userdoclist">My Documents</Link>
                </li>
                <li className="tab">
                  <Link to="#searchTab">Search</Link>
                </li>
              </ul>
            </div>
            <div id="allDocuments" className="tab-content col s12">
              <center className="pagination-key">
                <Pagination id="allPagination" className="pag"
                  items={this.props.documentPages}
                  maxButtons={8}
                  onSelect={(page) => {
                    const offset = (page - 1) * 10;
                    this.props.pagination(offset);
                  }}
                  />
              </center>
              <AllDocuments
                document={this.state.documents}
                setViewDocument={this.setViewDocument}/>
            </div>
            <div id="publicDocuments" className="tab-content col s12">
              <PublicDocuments
                document={this.state.documents}
                setViewDocument={this.setViewDocument} />
            </div>
            <div id="roleDocuments" className="tab-content col s12">
              <RoleDocuments
                document={this.state.documents}
                setViewDocument={this.setViewDocument} />
            </div>
            <div id="ownerDocuments" className="tab-content col s12">
              <MyDocuments
                document={this.state.documents}
                setEditDocument={this.setEditDocument}
                setViewDocument={this.setViewDocument}
                setDeleteDocument={this.setDeleteDocument}
                delete= {this.props.DeleteDocument} />
            </div>
            <div id="searchTab" className="tab-content col s12">
              <center className="pagination-key">
                <Pagination id="searchPagination" className="pag"
                  items={this.state.searchBarView ?
                  this.props.documentSearchPages : this.props.userSearchPages}
                  maxButtons={8}
                  onSelect={(page) => {
                    const offset = (page - 1) * 10;
                    {this.state.searchBarView ?
                    this.props.DocSearch(this.props.documentSearchQuery, offset)
                    :
                    this.props.UserSearch(this.props.userSearchQuery, offset) }
                  }}
                  />
              </center>
              <Search 
                documentsSearch={this.props.documentsSearch}
                setViewDocument={this.setViewDocument}
                usersSearch={this.props.usersSearch}
                view= {this.state.searchBarView}
                user='regular' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


/**
 * @param {Object} state 
 * @returns {Object} returns object
 */
const mapStoreToProps = (state) => {
  return {
    documentPages: state.documentReducer.pageCount,
    documentSearchPages: state.documentReducer.searchPageCount,
    documentSearchQuery: state.documentReducer.query,
    userSearchPages: state.userReducer.searchPageCount,
    userSearchQuery: state.userReducer.query,
    userPages: state.userReducer.pageCount
  };
};

/**
 * @param {Object} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    EditingDocument: (documentDetails, documentId) =>
    dispatch(EditDocumentAction(documentDetails, documentId)),
    DeleteDocument: (documentId) => dispatch(DeleteDocumentAction(documentId))
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(UserDashboard);
