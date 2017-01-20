/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/* eslint max-nested-callbacks: 0 */
define(['squire'], function (Squire) {
    'use strict';

    var injector = new Squire(),
        obj;

    window.checkout = {
        maxItemsToDisplay: 1
    };

    beforeEach(function (done) {
        injector.require(['Magento_Checkout/js/view/minicart'], function (Constr) {
            obj = new Constr({
                provider: 'provName',
                name: '',
                index: '',
                cart: {
                    /**
                     * Returns array of cart items
                     * @returns []
                     */
                    items: function () {
                        return [
                            {
                                itemId: 1
                            },
                            {
                                itemId: 2
                            }
                        ];
                    }
                },
                itemRenderer: {
                    'simpleProductType': 'customRenderer'
                }
            });
            done();
        });
    });

    describe('Magento_Checkout/js/view/minicart', function () {
        describe('"getCartItems" method', function () {
            it('Check for return value.', function () {
                var expectedResult = JSON.stringify([
                    {
                        itemId: 2
                    }
                ]);

                expect(obj.getCartItems().length).toBe(1);
                expect(JSON.stringify(obj.getCartItems())).toBe(expectedResult);
            });
        });

        describe('"getItemRenderer" method', function () {
            describe('Returns different renderers by product type', function () {
                it('Check for default renderer.', function () {
                    expect(obj.getItemRenderer('undefinedProductType')).toBe('defaultRenderer');
                });

                it('Check for custom renderer.', function () {
                    expect(obj.getItemRenderer('simpleProductType')).toBe('customRenderer');
                });
            });
        });

        describe('"getCartParam" method', function () {
            it('Check for return value.', function () {
                var expectedResult = JSON.stringify([
                    {
                        itemId: 1
                    },
                    {
                        itemId: 2
                    }
                ]);

                expect(obj.getCartParam('items').length).toBe(2);
                expect(JSON.stringify(obj.getCartParam('items'))).toBe(expectedResult);
            });
        });
    });
});
