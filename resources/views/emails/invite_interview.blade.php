<!DOCTYPE html>
<html>
<div style="font-family: Arial, Helvetica, sans-serif">
    @php
        $date = date_create($date);
        switch (date_format($date, 'N')) {
            case '1':
                $hari = 'Senin';
                break;
            case '2':
                $hari = 'Selasa';
                break;
            case '3':
                $hari = 'Rabu';
                break;
            case '4':
                $hari = 'Kamis';
                break;
            case '5':
                $hari = 'Jumat';
                break;
            case '6':
                $hari = 'Sabtu';
                break;
            default:
                $hari = 'Minggu';
                break;
        }
    @endphp
    <table>
        <tr>
            <td>
                Kepada Yth.<br/>
                Saudara /i {{ $name }}<br/>
                Di tempat.
            </td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td>
                Kami dari PT. Yasunaga Indonesia mengundang saudara untuk melakukan wawancara kerja pada:
            </td>
        </tr>
        <tr>
            <td></td>
        </tr>
    </table>

    <table>
        <tr>
            <td>Hari, Tanggal</td>
            <td>:</td>
            <td>{{ $hari }}, {{  date_format($date, 'd F Y') }}</td>
        </tr>
        <tr>
            <td>Jam</td>
            <td>:</td>
            <td>{{ $time }}</td>
        </tr>
    </table>
    <p>
        Demikian surat panggilan ini dibuat, Atas perhatiannya,<br/>
        Kami ucapkan terima kasih.
    </p>

    <p>
        @if ($confirm == 'yes')
            # Undangan ini membutuhkan konfirmasi, silahkan login ke web untuk melakukan konfirmasi.
        @endif
    </p>
</div>
</html>
