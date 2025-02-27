// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import cl from 'classnames';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CallTypeIcon } from '../../assets/SVGIcons/Call.svg';
import { ReactComponent as PublishTypeIcon } from '../../assets/SVGIcons/Publish.svg';
import { ReactComponent as TransferObjectTypeIcon } from '../../assets/SVGIcons/TransferObject.svg';
import { ReactComponent as ContentBackArrowDark } from '../../assets/SVGIcons/back-arrow-dark.svg';
import { ReactComponent as ContentFailedStatus } from '../../assets/SVGIcons/failed.svg';
import { ReactComponent as ContentSuccessStatus } from '../../assets/SVGIcons/success.svg';
import Longtext from '../../components/longtext/Longtext';

import type { ExecutionStatusType, TransactionKindName } from '@mysten/sui.js';

import styles from './TxResultHeader.module.css';

// Show the <- Go Back button
// Display the transaction Type (e.g. TransferCoin,TransferObject, etc.)
// Display the transaction ID and Copy button and Status (e.g. Pending, Success, Failure)
type TxResultState = {
    txId: string;
    status: ExecutionStatusType;
    txKindName: TransactionKindName;
    error?: string;
};

function TxAddressHeader({ data }: { data: TxResultState }) {
    const TxTransferTypeIcon = {
        Publish: PublishTypeIcon,
        TransferObject: TransferObjectTypeIcon,
        Call: CallTypeIcon,
        // TODO: use a different icon
        ChangeEpoch: CallTypeIcon,
        TransferSui: TransferObjectTypeIcon,
    };
    const TxKindName = data.txKindName;
    const Icon = TxTransferTypeIcon[TxKindName];
    const TxStatus = {
        success: ContentSuccessStatus,
        failed: ContentFailedStatus,
    };
    const statusName = data.status === 'success' ? 'success' : 'failed';
    const TxResultStatus = TxStatus[statusName];

    const navigate = useNavigate();

    const previousPage = useCallback(() => navigate(-1), [navigate]);

    return (
        <div className={styles.txheader}>
            <div className={styles.txback}>
                <button className={styles.longtext} onClick={previousPage}>
                    <ContentBackArrowDark /> Go Back
                </button>
            </div>
            <div className={styles.txtypes}>
                <Icon /> {TxKindName}
            </div>
            <div className={styles.txid}>
                <div>
                    <Longtext
                        text={data.txId}
                        category="addresses"
                        isLink={false}
                    />
                    <div
                        className={cl([
                            styles.txresulttype,
                            styles[statusName],
                        ])}
                    >
                        {' '}
                        <TxResultStatus /> {statusName}
                    </div>
                    {data.error && (
                        <div
                            className={cl([
                                styles.txresulttype,
                                styles.failed,
                                styles.error,
                            ])}
                        >
                            {data.error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TxAddressHeader;
