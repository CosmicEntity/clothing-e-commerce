import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.util';
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {updateCollections} from '../../redux/shop/shop.actions'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props
        const collectionRef = firestore.collection('collections')

       this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot=>{
           const collectionMap =  convertCollectionSnapshotToMap(snapshot);
           updateCollections(collectionMap);
           this.setState({loading: false})
        })
    }

    render(){
        const {match} = this.props;    
        const {loading} = this.state;
            return (
                <div className='shop-page'>
                <Switch>
                <Route exact path={`${match.path}`} 
                render={ props => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} 
                render={ props => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />    
                </Switch>
                </div>
                 
            )
        }
    }

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);