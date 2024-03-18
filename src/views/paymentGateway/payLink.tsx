import moment from 'moment';

type InvoiceDetails = {
    invoiceDetails: any;
    loading: boolean;
};

export default function PayLink({ invoiceDetails, loading }: InvoiceDetails) {
    return (
        <div className="flex justify-center items-center h-screen w-screen  p-10">
            {loading ? (
                <div className="flex justify-center items-center text-gray-400">Loading...</div>
            ) : (
                <div className="flex flex-col space-y-10 max-w-4xl mx-auto w-1/3">
                    <div>
                        <div className="mt-4 flex justify-between">
                            <div className="font-semibold">Nom Facture</div>
                            <div>{invoiceDetails.invoice_name}</div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col text-left">
                            <div className="font-semibold">Recipient</div>
                            <div>{invoiceDetails.vendor_name}</div>
                            <div className="mt-2 font-semibold">Date de livraison</div>
                            <div>{moment(invoiceDetails.delivery_date).format('YYYY-MM-DD')}</div>
                        </div>
                        <div className="flex flex-col text-right">
                            <div className="font-semibold">Destinataire</div>
                            <div>{invoiceDetails.client_name}</div>
                            <div className="mt-2 font-semibold">Date d'expiration</div>
                            <div>{moment(invoiceDetails.due_date).format('YYYY-MM-DD')}</div>
                        </div>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">Article</th>
                                <th className="py-2 text-right">Somme</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceDetails.items.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td className="border-t py-2 text-left">{item.description}</td>
                                    <td className="border-t py-2 text-right">{item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="border-t font-semibold py-2 text-left">Totale (Tous charges exclue):</td>
                                <td className="border-t font-semibold py-2 text-right">{invoiceDetails.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}

            {/* Second container for credit card payment gateway iframe */}
            <div className="flex justify-center mt-8 mx-auto w-1/2" >
                <div className="bg-gray-100 rounded-lg p-8 max-w-2xl">
                    {/* Placeholder for credit card payment gateway iframe */}
                    <div className="text-center text-gray-500">Credit Card Payment Gateway Placeholder</div>
                </div>
            </div>
        </div>
    );
}
