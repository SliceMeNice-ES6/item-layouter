import { debounce } from 'event-utils';

class ItemLayouter {
	constructor( containerElement, options ) {
		let defaultOptions = {};

		this.options = Object.assign( defaultOptions, options || {} );

		this.container = containerElement;
		this.items = new Map();

		this.layout = debounce( this._layout, 10 );
	}

	addItem( element ) {
		if ( !this.items.has( element ) ) {

			var item = this._createItem( element );
			this.items.set( element, item );

			this._onItemAdded( item );
			this.layout();
		}
	}

	removeItem( element ) {
		if ( this.items.has( element ) ) {
			var item = this.items.get( element );
			this.items.delete( element );

			this._onItemRemoved( item );
			this.layout();
		}
	}

	_createItem( element ) {
		var item = {
			element: element,
			position: null
		};

		return item;
	}

	_layout() {
		let itemsToLayout = Array.from( this.items.values() );
		itemsToLayout = this._filterItems( itemsToLayout );

		this._resetLayout( itemsToLayout );
		this._layoutItems( itemsToLayout );
		this._postLayout( itemsToLayout );
	}

	_resetLayout( itemsToLayout ) {
		// noop
	}

	_filterItems( items ) {
		return items;
	}

	_postLayout( itemsToLayout ) {
		// noop
	}
}

export default ItemLayouter;